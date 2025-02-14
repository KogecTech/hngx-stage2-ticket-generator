"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import  ProgressBar  from "@/components/ui/progress";


export default function TicketSelection() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const tickets = [
    { id: "standard", name: "REGULAR ACCESS", details: "Access to all sessions", price: "Free" },
    { id: "vip", name: "VIP ACCESS", details: "Priority seating + Networking", price: "$100" },
    { id: "vvip", name: "VVIP ACCESS", details: "Priority seating + Networking", price: "$200" },
  ];

  const handleSelect = (ticketId) => {
    setSelectedTicket(ticketId);
  };

  const handleNext = () => {
    if (selectedTicket) {
      localStorage.setItem("selectedTicket", JSON.stringify({ type: selectedTicket, quantity }));
      router.push("/attendee-details");
    } else {
      alert("Please select a ticket!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px] mx-auto">
      <Card className="flex flex-col w-full max-w-[702px] items-center justify-center gap-8 p-12 bg-[#041e22] rounded-3xl border border-solid border-[#0e464f]">

        {/* Progress Bar */}
        <ProgressBar step={1} />
        
        {/* Conference Info with Border */}
        <div className="w-full p-6 border border-[#23a0b5] rounded-lg text-center">
          <h1 className="text-[62px] leading-[62px] text-center font-[Road_Rage] text-[#FAFAFA]">
            Techember Fest "25
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-center">
            Join us for an unforgettable experience at TECHEMBER! Secure your spot now.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-center">
            <span>📍 Ikoyi Lagos</span>
            <span>| |</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-b border-[#0e464f]"></div>

        

        {/* Ticket Selection */}
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="[font-family:'Alatsi',Helvetica] text-white text-[24px] text-center">
              Select a ticket that best suits your needs
            </h1>
          </div>

          {/* Ticket Options with Border */}
          <div className="w-full p-6 border border-[#23a0b5] rounded-lg">
            <Card className="w-full bg-transparent border-none">
              <CardContent className="flex flex-col gap-4 w-full">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                      selectedTicket === ticket.id ? "border-[#23a0b5] bg-[#07333c]" : "border-[#0e464f] hover:border-[#23a0b5]"
                    }`}
                    onClick={() => handleSelect(ticket.id)}
                  >
                    <h2 className="text-lg font-semibold text-white">{ticket.name}</h2>
                    <p className="text-gray-400">{ticket.details}</p>
                    <p className="text-lg font-bold mt-2 text-white">{ticket.price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ticket Quantity Dropdown - Always Visible */}
        <div className="w-full">
          <label className="text-sm text-gray-400 font-semibold mb-2 block">Number of Tickets:</label>
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
        <div className="flex gap-6 w-full">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex-1 text-[#23a0b5] border-[#23a0b5] hover:text-[#23a0b5] hover:bg-[#23a0b5]/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-[#23a0b5] hover:bg-[#23a0b5]/90"
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
