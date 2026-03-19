export async function sendEmbeddings(formData: FormData) {
  try {
    const route = import.meta.env.VITE_BACKEND_API_ROUTE_EMBEDDINGS;
    if (!route) throw new Error("Route not found");

    const response = await fetch(route, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error with backend: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("PDF failed to upload: ", error);
    throw error;
  }
}
