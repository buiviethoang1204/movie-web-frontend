// src/lib/api.ts

import axios from "axios";
import { Movie } from "@/types/movie"; // Sử dụng alias @/ cho src/

// Lấy API Base URL từ biến môi trường
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await apiClient.get<Movie[]>("/movies"); // Gọi endpoint /movies từ Backend
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await apiClient.get<Movie>(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    return null;
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await apiClient.get<Movie[]>("/movies/search", {
      params: { q: query }, // Truyền từ khóa tìm kiếm qua query parameter 'q'
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies for query "${query}":`, error);
    return [];
  }
}
