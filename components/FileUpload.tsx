"use client";
import React, { useState, ChangeEvent } from "react";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${URL}/api/leads/bulk`, {
          method: "POST",
          body: formData,
        });
        console.log(response);

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="flex flex-col  space-y-3">
      <input
        type="file"
        accept=".csv, application/vnd.ms-excel"
        onChange={handleFileChange}
        className="w-fit "
      />
      <button
        className="capitalize bg-blue-500 text-white px-2 py-0.5 rounded whitespace-nowrap w-60"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
