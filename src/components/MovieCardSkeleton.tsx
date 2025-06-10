// src/components/MovieCardSkeleton.tsx

export default function MovieCardSkeleton() {
  return (
    <div className="group relative block bg-gray-700 rounded-lg overflow-hidden shadow-lg animate-pulse">
      {/* Vùng chứa Poster - Sẽ là một hình chữ nhật xám */}
      <div className="relative w-full aspect-[2/3] bg-gray-600">
        {/* Không có Image, chỉ là khối màu */}
      </div>
      {/* Thông tin phim - Sẽ là các dòng xám */}
      <div className="p-3">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>{" "}
        {/* Dòng tiêu đề */}
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>{" "}
        {/* Dòng rating/năm */}
      </div>
    </div>
  );
}
