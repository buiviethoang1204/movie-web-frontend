// src/app/movies/[id]/page.tsx

import { getMovieById } from "@/lib/api";
import { Movie, Episode } from "@/types/movie";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link"; // Import Link
import { ChevronLeftIcon } from "@heroicons/react/20/solid"; // Biểu tượng quay lại (cần cài đặt @heroicons/react)

// Để sử dụng Heroicons, bạn cần cài đặt:
// npm install @heroicons/react

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = params;
  const movie: Movie | null = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  // Xử lý để có một URL video chính thức hoặc trailer
  const primaryVideoUrl =
    movie.videoUrl ||
    (movie.episodes && movie.episodes.length > 0
      ? movie.episodes[0].videoUrl
      : null);
  const videoToPlayId = getYouTubeVideoId(
    primaryVideoUrl || movie.trailerUrl || ""
  );
  const videoPlayerSrc = videoToPlayId
    ? `https://www.youtube.com/embed/${videoToPlayId}?autoplay=1&rel=0`
    : "";

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Nút quay lại */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Quay lại Trang chủ
        </Link>
      </div>

      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden md:flex">
        {/* Poster hoặc Backdrop */}
        <div className="flex-shrink-0 md:w-1/3 relative overflow-hidden rounded-l-lg">
          {movie.posterUrl || movie.backdropUrl ? (
            <Image
              src={
                movie.posterUrl ||
                `https://image.tmdb.org/t/p/w780${movie.backdropUrl}`
              }
              alt={movie.title || "Movie Poster"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
              No Image
            </div>
          )}
        </div>

        {/* Thông tin phim */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {movie.title}
            </h1>
            {movie.rating && (
              <p className="text-xl text-yellow-400 mb-4">
                Rating: {movie.rating.toFixed(1)} / 10
              </p>
            )}
            <p className="text-gray-300 text-lg mb-4">
              {movie.description || "Chưa có mô tả cho bộ phim này."}
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-400 text-sm mb-6">
              <div>
                <p>
                  <span className="font-semibold">Thể loại:</span>{" "}
                  {movie.genres?.join(", ") || "Đang cập nhật"}
                </p>
                <p>
                  <span className="font-semibold">Đạo diễn:</span>{" "}
                  {movie.director || "Đang cập nhật"}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Diễn viên:</span>{" "}
                  {movie.cast?.join(", ") || "Đang cập nhật"}
                </p>
                <p>
                  <span className="font-semibold">Ngày phát hành:</span>{" "}
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Đang cập nhật"}
                </p>
              </div>
            </div>
          </div>
          {/* Thêm phần nút xem trailer hoặc nút khác ở đây nếu muốn */}
          {/* Ví dụ: <button className="bg-red-600 text-white px-4 py-2 rounded-md">Xem Trailer</button> */}
        </div>
      </div>

      {/* Khu vực Video Player */}
      {videoPlayerSrc ? (
        <div className="mt-8 bg-gray-900 rounded-lg shadow-xl p-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            {movie.isSeries && movie.episodes && movie.episodes.length > 0
              ? movie.episodes[0].title ||
                `Tập ${movie.episodes[0].episodeNumber}`
              : "Phát Phim"}
          </h2>
          <div
            className="relative w-full"
            style={{ paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={videoPlayerSrc}
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-400 text-lg bg-gray-900 rounded-lg shadow-xl p-6">
          Xin lỗi, không có video hoặc trailer để phát cho bộ phim này.
        </div>
      )}

      {/* Danh sách các tập (nếu là phim bộ) */}
      {movie.isSeries &&
        movie.episodes &&
        movie.episodes.length > 0 && ( // Kiểm tra length > 0
          <div className="mt-8 bg-gray-900 rounded-lg shadow-xl p-4">
            <h2 className="text-3xl font-bold text-white mb-4">
              Danh sách Tập
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {movie.episodes.map((episode, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Tập {episode.episodeNumber}: {episode.title || "N/A"}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 truncate">
                    {episode.description || "Chưa có mô tả cho tập này."}
                  </p>
                  {/* Sau này có thể thêm chức năng đổi tập khi click vào */}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
