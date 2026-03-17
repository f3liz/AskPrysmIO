export async function login(formData: object): Promise<string> {
  try {
    const route = import.meta.env.VITE_BACKEND_API_ROUTE_AUTH! + "login";
    if (!route) {
      throw new Error("Route not found");
    }

    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error with backend: ${response.status}`);
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Failed to login: ", error);
    throw error;
  }
}
