from datetime import datetime, timezone
from uuid import uuid4
from fastapi import HTTPException

from backend.db import supabase
from backend.utils import question_retrieval_util, prompting_util, llm_util 

MAX_CHARS_CONTEXT = 4000


def utc_now():
    return datetime.now(timezone.utc).isoformat()

async def get_chat_history(user_id: str) -> list:
    result = (
        supabase.table("chats")
        .select("id, title, created_at, updated_at")
        .eq("user_id", user_id)
        .order("updated_at", desc=True)
        .execute()
    )

    return result.data or []

async def get_chat_thread(chat_id: str, user_id: str) -> dict:
    chat_result = (
        supabase.table("chats")
        .select("id, title, created_at, updated_at")
        .eq("id", chat_id)
        .eq("user_id", user_id)
        .execute()
    )

    if not chat_result.data:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    chat = chat_result.data[0]

    messages_result = (
        supabase.table("messages")
        .select("role, content, created_at")
        .eq("chat_id", chat_id)
        .order("created_at", desc=False)
        .execute()
    )

    return {
        "chat": chat,
        "messages": messages_result.data or []
    }

async def generate_response(question: str, chat_id: str | None, user_id: str) -> dict:
    # 1. Create new chat if this is the first message
    if chat_id is None:
        chat_id = str(uuid4())

        new_chat = {
            "id": chat_id,
            "user_id": user_id,
            "title": question[:60],
            "created_at": utc_now(),
            "updated_at": utc_now()
        }

        supabase.table("chats").insert(new_chat).execute()

    # 2. If chat_id exists, verify the chat belongs to this user
    else:
        chat_result = (
            supabase.table("chats")
            .select("id, user_id")
            .eq("id", chat_id)
            .eq("user_id", user_id)
            .execute()
        )

        if not chat_result.data:
            raise HTTPException(
                status_code=404,
                detail="Chat not found"
            )

    # 3. Save user message before calling the LLM
    user_message = {
        "id": str(uuid4()),
        "chat_id": chat_id,
        "role": "user",
        "content": question,
        "created_at": utc_now()
    }

    supabase.table("messages").insert(user_message).execute()

    # 4. Get RAG context from your documents
    results = await question_retrieval_util.search_docs(question)

    if not results:
        answer = "No relevant information found in database."

        assistant_message = {
            "id": str(uuid4()),
            "chat_id": chat_id,
            "role": "assistant",
            "content": answer,
            "created_at": utc_now()
        }

        supabase.table("messages").insert(assistant_message).execute()

        supabase.table("chats").update({
            "updated_at": utc_now()
        }).eq("id", chat_id).execute()

        return {
            "chat_id": chat_id,
            "answer": answer
        }
    
    context_chunks = []
    size = 0

    for chunk in results:
        text = chunk["content"]

        if size + len(text) > MAX_CHARS_CONTEXT:
            break

        context_chunks.append(text)
        size += len(text)
    
    context = "\n\n".join(context_chunks)

    # 5. Fetch full message history for this chat
    history_result = (
        supabase.table("messages")
        .select("role, content, created_at")
        .eq("chat_id", chat_id)
        .order("created_at")
        .execute()
    )

    history = history_result.data or []

    # 6. Pass full prior history into the prompt
    messages = prompting_util.build_messages(
        question=question,
        context=context,
        history=history
    )

    # 7. Call LLM
    answer = await llm_util.generate_answer(messages)

    # 8. Save assistant response
    assistant_message = {
        "id": str(uuid4()),
        "chat_id": chat_id,
        "role": "assistant",
        "content": answer,
        "created_at": utc_now()
    }

    supabase.table("messages").insert(assistant_message).execute()

    # 9. Update chat timestamp
    supabase.table("chats").update({
        "updated_at": utc_now()
    }).eq("id", chat_id).execute()

    return {
        "chat_id": chat_id,
        "answer": answer
    }