"use client";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading("delete");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Delete completed");
    } finally {
      setIsLoading(null);
    }
  };

  const handleDownload = async () => {
    setIsLoading("download");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Download completed");
    } finally {
      setIsLoading(null);
    }
  };

  const handleEdit = async () => {
    setIsLoading("edit");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Edit completed");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        onClick={handleDelete}
        disabled={isLoading === "delete"}
        className={
          isLoading === "delete"
            ? "py-2 w-30 border border-gray-200 rounded-md bg-gray-100 text-gray-400 m-5 cursor-not-allowed"
            : "py-2 w-30 border border-red-200 rounded-md bg-red-300 text-red-700 hover:bg-red-400 transition-colors m-5 font-bold"
        }
      >
        {isLoading === "delete" ? "Deleting..." : "Delete"}
      </button>

      <button
        onClick={handleDownload}
        disabled={isLoading === "download"}
        className={
          isLoading === "download"
            ? "py-2 w-30 border border-gray-200 rounded-md bg-gray-100 text-gray-400 m-5 cursor-not-allowed"
            : "py-2 w-30 border border-gray-200 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors m-5 font-bold"
        }
      >
        {isLoading === "download" ? "Downloading..." : "Download"}
      </button>

      <button
        onClick={handleEdit}
        disabled={isLoading === "edit"}
        className={
          isLoading === "edit"
            ? "py-2 w-30 border border-gray-200 rounded-md bg-gray-100 text-gray-400 m-5 cursor-not-allowed"
            : "py-2 w-30 border border-gray-200 rounded-md bg-blue-300 text-blue-700 hover:bg-blue-400 transition-colors m-5 font-bold"
        }
      >
        {isLoading === "edit" ? "Editing..." : "Edit"}
      </button>
    </div>
  );
}

export default App;
