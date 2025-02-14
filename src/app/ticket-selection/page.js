"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress";

export default function TicketSelection() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const tickets = [
    {
      id: "standard",
      name: "REGULAR ACCESS",
      details: "Access to all sessions",
      price: "Free",
    },
    {
      id: "vip",
      name: "VIP ACCESS",
      details: "Priority seating + Networking",
      price: "$100",
    },
    {
      id: "vvip",
      name: "VVIP ACCESS",
      details: "Priority seating + Networking",
      price: "$200",
    },
  ];

  const handleSelect = (ticketId) => {
    setSelectedTicket(ticketId);
  };

  const handleNext = () => {
    if (selectedTicket) {
      localStorage.setItem(
        "selectedTicket",
        JSON.stringify({ type: selectedTicket, quantity })
      );
      router.push("/attendee-details");
    } else {
      alert("Please select a ticket!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#041e22] px-4">
      <Card
        className="relative w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] p-6 md:p-12
        rounded-3xl border border-[#0e464f] bg-[#041e22]
        shadow-[inset_0px_0px_10px_2px_rgba(35,160,181,0.3)]"
      >
        <ProgressBar step={1} />

        <CardContent className="flex flex-col items-center gap-8 relative z-10">
          {/* Conference Info */}
          <div className="w-full p-6 border border-[#23a0b5] rounded-lg text-center">
            <h1 className="text-[32px] md:text-[62px] leading-[36px] md:leading-[62px] font-[Road_Rage] text-[#FAFAFA]">
              Techember Fest "25
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto text-center mt-2 text-sm md:text-base">
              Join us for an unforgettable experience at TECHEMBER! Secure your spot now.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 text-gray-400 text-center text-sm md:text-base">
              <span>📍 Ikoyi Lagos</span>
              <span className="hidden md:block">| |</span>
              <span>March 15, 2025 | 7:00 PM</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-b border-[#0e464f]" />

          {/* Ticket Selection Header */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="font-[Alatsi] text-white text-[20px] md:text-[24px] text-center">
              Select a ticket that best suits your needs
            </h1>
          </div>

          {/* Ticket Options */}
          <div className="w-full p-4 md:p-6 border border-[#23a0b5] rounded-lg">
            <Card className="w-full bg-transparent border-none">
              <CardContent className="flex flex-col gap-4 w-full">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                      selectedTicket === ticket.id
                        ? "border-[#23a0b5] bg-[#07333c]"
                        : "border-[#0e464f] hover:border-[#23a0b5]"
                    }`}
                    onClick={() => handleSelect(ticket.id)}
                  >
                    <h2 className="text-lg font-semibold text-white">
                      {ticket.name}
                    </h2>
                    <p className="text-gray-400">{ticket.details}</p>
                    <p className="text-lg font-bold mt-2 text-white">
                      {ticket.price}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Ticket Quantity */}
          <div className="w-full">
            <label className="text-sm text-gray-400 font-semibold mb-2 block">
              Number of Tickets:
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-[#0e464f] bg-[#07333c] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23a0b5]"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1 text-[#23a0b5] border-[#23a0b5] hover:text-[#23a0b5] hover:bg-[#23a0b5]/10 py-3"
            >
              Cancel
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#23a0b5] hover:bg-[#23a0b5]/90 py-3"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
