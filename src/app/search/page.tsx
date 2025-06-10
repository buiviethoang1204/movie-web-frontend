// src/app/search/page.tsx

import { Suspense } from "react"; // Import Suspense cho fallback
import { searchMovies } from "@/lib/api"; // Import hàm searchMovies
import MovieCard from "@/components/MovieCard"; // Import MovieCard

interface SearchPageProps {
  searchParams: {
    q?: string; // Query parameter 'q' là tùy chọn
  };
}

// Component sẽ fetch và hiển thị kết quả tìm kiếm
async function SearchResults({ query }: { query: string }) {
  const movies = await searchMovies(query);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-6">
        Kết quả tìm kiếm cho: &quot;{query}&quot;
      </h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg text-center mt-10">
          Không tìm thấy phim nào phù hợp với từ khóa &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}

// Trang tìm kiếm chính (Server Component)
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""; // Lấy từ khóa tìm kiếm từ searchParams

  return (
    <div>
      {query ? (
        // Sử dụng Suspense để hiển thị loading state trong khi dữ liệu đang tải
        <Suspense
          fallback={
            <div className="container mx-auto py-8 px-4 text-center text-white text-xl">
              Đang tìm kiếm phim...
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <div className="container mx-auto py-8 px-4 text-center text-gray-400 text-lg">
          Vui lòng nhập từ khóa để tìm kiếm phim.
        </div>
      )}
    </div>
  );
}
