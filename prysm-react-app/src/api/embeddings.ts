import { api } from "./api";

export async function sendEmbeddings(formData: FormData) {
  try {
    const response = await api.post("/embeddings/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("PDF failed to upload: ", error);
    throw error;
  }
}
