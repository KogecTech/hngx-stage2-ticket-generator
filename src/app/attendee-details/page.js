"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import UploadBox from "@/components/ui/upload-box";
import ProgressBar from "@/components/ui/progress";

export default function AttendeeDetails() {
  const router = useRouter();

  const [attendee, setAttendee] = useState({
    name: "",
    email: "",
    specialRequest: "",
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load saved details on component mount
  useEffect(() => {
    const storedTicket = localStorage.getItem("selectedTicket");
    const storedAttendee = localStorage.getItem("attendeeDetails");
    const storedImage = localStorage.getItem("uploadedImage");

    if (storedTicket) {
      setSelectedTicket(JSON.parse(storedTicket));
    } else {
      setSelectedTicket({ type: "General", quantity: 1 }); // Default Ticket
    }

    if (storedAttendee) {
      setAttendee(JSON.parse(storedAttendee));
    }

    if (storedImage) {
      setUploadedImageUrl(storedImage);
    }
  }, []);

  // Save attendee input in localStorage on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedAttendee = { ...attendee, [name]: value };
    setAttendee(updatedAttendee);
    localStorage.setItem("attendeeDetails", JSON.stringify(updatedAttendee));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tic-generator");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dboq5ye92/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setUploadedImageUrl(data.secure_url);
        localStorage.setItem("uploadedImage", data.secure_url);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    if (!attendee.name || !attendee.email || !uploadedImageUrl) {
      alert("Please fill in all required fields, including profile picture!");
      return;
    }

    if (!validateEmail(attendee.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const finalAttendee = { ...attendee, profilePic: uploadedImageUrl };
    localStorage.setItem("attendeeDetails", JSON.stringify(finalAttendee));

    router.push("/ticket-booked");
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <Card
        className="relative w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] p-6 md:p-12
        rounded-3xl border border-[#0e464f]
        shadow-[inset_0px_0px_10px_2px_rgba(35,160,181,0.3)]"
      >
        <ProgressBar step={2} />

        <CardContent className="flex flex-col gap-8 relative z-10">
          {/* Upload Section */}
          <div className="rounded-3xl border-[#07363e] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
            <label className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 mt-2">
              UploadCloudIcon Profile Photo
            </label>
            <div className="h-[200px] flex items-center justify-center bg-[#00000033]">
              <div className="w-48 h-48 md:w-60 md:h-60 flex flex-col items-center justify-center gap-4 p-6 bg-[#0e464e] rounded-[32px] border-4 border-[#23a0b580] my-[-20px]">
                <UploadBox onChange={handleImageUpload} isUploading={isUploading} />
              </div>
            </div>
            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="mt-2 w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-[#23a0b5]"
              />
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-1 bg-[#07363e]" />

          {/* Form Section */}
          <div className="flex flex-col gap-4">
            <label className="text-sm md:text-base text-gray-400">Enter your Full Name</label>
            <Input
              name="name"
              value={attendee.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="bg-[#07333c] text-white border-[#0e464f]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm md:text-base text-gray-400">Enter your Email</label>
            <Input
              name="email"
              value={attendee.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              className="bg-[#07333c] text-white border-[#0e464f]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm md:text-base text-gray-400">Special Requests</label>
            <textarea
              name="specialRequest"
              value={attendee.specialRequest}
              onChange={handleInputChange}
              placeholder="Any special requests?"
              className="bg-[#07333c] text-white border-[#0e464f] p-2 rounded-md resize-none h-[100px]"
            />
          </div>

          {selectedTicket && (
            <div className="p-4 text-white">
              <p className="text-lg font-semibold capitalize">{selectedTicket.type}</p>
              <p>Quantity: {selectedTicket.quantity}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
            <Button
              variant="outline"
              className="md:w-1/2 text-[#23a0b5] border-[#23a0b5] py-3"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button className="md:w-1/2 bg-[#23a0b5] py-3" onClick={handleNext}>
              Get My Free Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

