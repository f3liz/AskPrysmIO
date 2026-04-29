import { api } from "./api";

export async function login(formData: object): Promise<string> {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data.message;
  } catch (error) {
    console.error("Failed to login: ", error);
    throw error;
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  try {
    await api.get("/auth/refresh");
    return true;
  } catch {
    return false;
  }
}
