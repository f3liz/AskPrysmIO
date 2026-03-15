export async function sendEmbeddings(formData: object) {
  try {
    const route = import.meta.env.VITE_BACKEND_API_ROUTE_EMBEDDINGS;
    if (!route) throw new Error("Route not found");

    const response = await fetch(route, {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error with backend: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Question failed to upload: ", error);
    throw error;
  }
}
