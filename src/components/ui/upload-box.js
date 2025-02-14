"use client";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const UploadBox = ({ onChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setImagePreview(localPreview);

    onChange(file); // Sends file to AttendeeDetails for form submission
  };

  return (
    <div className="w-full h-[200px] flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border-2 border-[#07363e] backdrop-blur-[14px] bg-[#041e22] relative">
      {imagePreview ? (
        <img src={imagePreview} alt="Preview" className="w-[150px] h-[150px] object-cover rounded-lg border border-[#197686]" />
      ) : (
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <UploadCloud className="w-12 h-12 text-[#23a0b5]" />
          <span className="text-[#b3b3b3] text-center text-sm">Drag & Drop or Click to Upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};

export default UploadBox;
