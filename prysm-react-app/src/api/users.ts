import { api } from "./api";
import { isAxiosError } from "axios";

export interface UserCreate {
  username: string;
  password?: string;
  is_admin?: boolean;
}

export interface UserUpdate {
  username?: string;
  is_admin?: boolean;
  password?: string;
}

export interface UserResponse {
  id: number;
  username: string;
  is_admin: boolean;
  created_at: string;
}

export const userApi = {
  async getAllUsers(): Promise<{ users: UserResponse[] }> {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      throw error;
    }
  },

  async getUser(id: number): Promise<{ user: UserResponse }> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user ${id}: `, error);
      throw error;
    }
  },

  async createUser(data: UserCreate): Promise<{ user: UserResponse }> {
    try {
      const response = await api.post("/users", data);
      return response.data;
    } catch (error) {
      console.error("Failed to create user: ", error);

      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || "Failed to create user",
        );
      }

      throw new Error("An unexpected network error occurred");
    }
  },

  async updateUser(
    id: number,
    data: UserUpdate,
  ): Promise<{ user: UserResponse }> {
    try {
      const response = await api.patch(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user ${id}: `, error);
      throw error;
    }
  },

  async deleteUser(
    id: number,
  ): Promise<{ message: string; deleted_user: UserResponse }> {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete user ${id}: `, error);
      throw error;
    }
  },
};
