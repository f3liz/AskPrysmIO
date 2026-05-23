export type Message = {
  content: string;
  role: "user" | "assistant";
  id: string;
  chat_id: string;
  created_at: Date;
}

type FAQ = {
    id: number,
    question: string;
    sections: Section[];
}

export type Section = {
    title: string;
    content: string[];
}

export type SearchBarProps = {
    onSearch: (faqs: FAQ[]) => void;
}

export type AccordionItemProps = {
    title: string;
    data: Section[];
    isExpanded: boolean;
    onToggle: () => void;
};