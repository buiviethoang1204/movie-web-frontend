// src/components/SearchInput.tsx

"use client"; // Dòng này là bắt buộc để sử dụng React Hooks trong Next.js App Router

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter từ next/navigation

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter(); // Khởi tạo router

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn form submit gây reload trang
    if (query.trim()) {
      // Chỉ tìm kiếm nếu query không rỗng
      router.push(`/search?q=${encodeURIComponent(query.trim())}`); // Điều hướng đến trang tìm kiếm
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
      />
      <button
        type="submit"
        className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Tìm
      </button>
    </form>
  );
}
