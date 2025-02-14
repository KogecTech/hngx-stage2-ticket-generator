"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const router = useRouter();

  const content = {
    title: "Event Ticket Booking UI – Open Source Practice Project 🎟",
    sections: [
      {
        heading: "Overview",
        content: `This is a beginner-friendly yet practical Event Ticket Booking UI designed for developers to clone, explore, and build upon. The design focuses on a seamless, login-free ticket reservation flow, allowing users to book event tickets quickly and efficiently.

The project consists of a three-step ticket booking flow, and developers can extend it further by integrating payment solutions, user authentication (optional), and ticket validation systems.`,
      },
      {
        heading: "Flow & Features",
        content: `1. Ticket Selection  
        • Users can browse available tickets (Free & Paid).  
        • Ticket options are displayed in a list or card view.  
        • For Free Tickets → Clicking "Get Free Ticket" proceeds to attendee details.  
        • For Paid Tickets → Clicking "Purchase Ticket" would ideally open a payment modal.
        
        2. Attendee Details Form  
        • Users input their Name, Email, and optional Phone Number.  
        • Profile picture upload option with preview functionality.  
        • Ticket summary is visible to ensure users review their details before submission.  
        
        3. Payment or Success Page  
        • If the ticket is free, the user is taken directly to the Ticket Confirmation Page.  
        • If the ticket is paid, developers can integrate Stripe, Paystack, or Flutterwave to process payments before showing the confirmation page.  
        • Upon successful booking, users should receive:  
        • A visual ticket preview with a unique QR Code.  
        • An option to download the ticket as PDF or save it to their device.  
        • An email confirmation containing ticket details.`,
      },
      {
        heading: "How to Build This 🚀",
        content: `This UI can be implemented using:

📌 **Frontend (Next.js or React)**  
• Component Breakdown:  
  - TicketCard.tsx → Displays ticket details  
  - AttendeeForm.tsx → Captures user details  
  - PaymentModal.tsx → Handles payment processing  
  - SuccessScreen.tsx → Shows the final ticket preview  

📌 **Backend (Optional)**  
• If persistence is required, a backend can be built using:  
  - Node.js & Express or Firebase Functions  
  - Database: MongoDB, PostgreSQL, or Firebase Firestore  

📌 **Payment Integration**  
• For paid events, developers should integrate:  
  - Stripe Checkout (for international transactions)  
  - Paystack or Flutterwave (for African users)  

**What You'll Learn 🧑‍💻**  
• File handling & validation (profile picture uploads).  
• Dynamic UI updates based on ticket selection.  
• Persisting bookings using local state or a backend.  
• Integrating payment gateways for ticket purchases.  
• Generating & validating QR Codes for event check-in (Advanced).

Need Help? Reach Out! 💬`,
      },
    ],
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#041e22] px-4">
      {/* Main Card */}
      <Card
        className="w-full max-w-[90%] md:max-w-[600px] lg:max-w-[800px]
        bg-[#05252c] rounded-[40px] border border-[#0e464f] p-6 md:p-8 shadow-lg"
      >
        <CardContent className="flex flex-col items-center gap-8">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold text-white text-center leading-snug">
            {content.title}
          </h1>

          {/* Sections */}
          <div className="text-white leading-[150%] font-normal text-sm md:text-base w-full">
            {content.sections.map((section, index) => (
              <div key={index} className="mb-6">
                {section.heading && (
                  <h2 className="font-medium text-lg mb-3">{section.heading}</h2>
                )}
                <p className="whitespace-pre-line text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="font-normal text-white text-[48px] md:text-[80px] text-center leading-[60px] md:leading-[120px]">
            💛 Enjoy
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-[#041e22] rounded-2xl border border-[#0e464f] w-full">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="md:w-[200px] text-[#23a0b5] border-[#23a0b5] hover:text-white hover:bg-[#23a0b5]"
            >
              Design File
            </Button>
            <Button
              className="md:w-[200px] bg-[#23a0b5] hover:bg-[#1d8b9f]"
              onClick={() =>
                router.push("https://github.com/KogecTech/hngx-stage2-ticket-generator.git")
              }
            >
              Github Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
