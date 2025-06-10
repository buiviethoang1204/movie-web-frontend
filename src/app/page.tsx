// src/app/page.tsx

import { Suspense } from "react"; // Import Suspense
import { getMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton"; // Import MovieCardSkeleton

// Tạo một component con để fetch và render các hàng phim
// Component này sẽ được bọc trong Suspense
async function MovieListSection() {
  const movies = await getMovies();

  const actionMovies = movies
    .filter((movie) => movie.genres?.includes("Action"))
    .slice(0, 12);
  const comedyMovies = movies
    .filter((movie) => movie.genres?.includes("Comedy"))
    .slice(0, 12);
  const allMovies = movies; // Hiển thị tất cả nếu muốn

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6">Phim Hành Động</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
        {actionMovies.length > 0 ? (
          actionMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            Không tìm thấy phim Hành Động nào.
          </p>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white mb-6">Phim Hài</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
        {comedyMovies.length > 0 ? (
          comedyMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            Không tìm thấy phim Hài nào.
          </p>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white mb-6">Tất cả Phim</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {allMovies.length > 0 ? (
          allMovies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-400">
            Không có phim nào trong cơ sở dữ liệu. Hãy thử chạy seed API ở
            backend.
          </p>
        )}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense
        fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map(
              (
                _,
                index // Hiển thị 12 skeleton cards
              ) => (
                <MovieCardSkeleton key={index} />
              )
            )}
          </div>
        }
      >
        <MovieListSection />
      </Suspense>
    </div>
  );
}
