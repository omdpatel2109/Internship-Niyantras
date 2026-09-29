"use client"
import {useState} from "react";
function App() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading("delete");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert("Delete completed");
    } finally {
      setIsLoading(null);
    }
  };

  const handleDownload = async () => {
    setIsLoading("download");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert("Download completed");
    } finally {
      setIsLoading(null);
    }
  };

  const handleEdit = async () => {
    setIsLoading("edit");

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      alert("Edit completed");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="block flex items-center justify-center">
      <button
        onClick={handleDelete}
        disabled={isLoading === "delete"}
        className={isLoading === "delete" ? "py-2 w-30 border rounded-md bg-gray-400 m-5" : 
          "py-2 w-30 border rounded-md bg-red-500 m-5 "}
      >
        {isLoading === "delete" ? "Deleting..." : "Delete"}
      </button>

      <button
        onClick={handleDownload}
        disabled={isLoading === "download"}
        className={isLoading === "download" ? "py-2 w-30 border rounded-md bg-gray-400 m-5" : 
          "py-2 border rounded-md bg-blue-500 m-5 w-30"}
      >
        {isLoading === "download" ? "Downloading..." : "Download"}
      </button>

      <button
        onClick={handleEdit}
        disabled={isLoading === "edit"}
        className={isLoading === "edit" ? "py-2 w-30 border rounded-md bg-gray-400 m-5" : 
          "py-2 border rounded-md bg-green-500 m-5 w-30"}
      >
        {isLoading === "edit" ? "Editing..." : "Edit"}
      </button>
    </div>
  );
}

export default App;