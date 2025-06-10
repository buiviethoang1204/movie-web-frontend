// src/types/movie.ts

export interface Episode {
  episodeNumber: number;
  title: string;
  videoUrl: string;
  description: string;
}

export interface Movie {
  videoUrl: string;
  _id: string; // MongoDB ID
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl?: string; // Có thể không có
  releaseDate?: string; // Có thể là string nếu không parse Date
  genres?: string[];
  director?: string;
  cast?: string[];
  trailerUrl?: string;
  rating?: number;
  duration?: number;
  isSeries?: boolean;
  episodes?: Episode[];
  createdAt?: string; // Mongoose tự thêm
  updatedAt?: string; // Mongoose tự thêm
}
