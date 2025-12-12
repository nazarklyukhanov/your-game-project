import { axiosInstance } from "../../../shared/lib/axiosInstance";
import type { UpdateUserData } from "../model";

export class UserApi {
  static async getAll() {
    const { data } = await axiosInstance.get("/users");
    return data;
  }

  static async getById(id: number) {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }

  static async updateProfile(id: number, updateData: UpdateUserData) {
    const { data } = await axiosInstance.put(`/users/${id}`, updateData);
    return data;
  }

  static async deleteById(id: number) {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  }
}
