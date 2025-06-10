// src/components/MovieCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const fallbackPoster = "/no-image.jpg"; // Ảnh mặc định nếu không có poster
  const imageUrl = movie.posterUrl || fallbackPoster;
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "N/A";

  return (
    <Link
      href={`/movies/${movie._id}`}
      className="group relative block bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      {/* Vùng chứa Poster */}
      <div className="relative w-full aspect-[2/3] bg-gray-600">
        <Image
          src={imageUrl}
          alt={movie.title || "Movie Poster"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300 group-hover:opacity-50" // Thêm opacity cho hiệu ứng hover
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          quality={75}
          loading="lazy"
        />
        {/* Overlay và nút Xem chi tiết khi hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <span className="text-white text-lg font-bold text-center mb-2">
            Xem chi tiết
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Xem ngay
          </button>
        </div>
      </div>
      {/* Thông tin phim */}
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-300">
          {movie.title}
        </h3>
        {movie.rating && (
          <p className="text-sm text-gray-300 mt-1">
            Rating:{" "}
            <span className="font-bold text-yellow-400">
              {movie.rating.toFixed(1)}
            </span>
          </p>
        )}
        {/* Hiển thị năm phát hành */}
        {movie.releaseDate && (
          <p className="text-sm text-gray-400">Năm: {releaseYear}</p>
        )}
      </div>
    </Link>
  );
}
