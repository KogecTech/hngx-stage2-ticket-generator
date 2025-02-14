"use client";
import React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for merging classes

const ProgressBar = ({ step }) => {
  // Calculate progress percentage
  const progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="flex flex-col items-start gap-3 relative self-stretch w-full">
      <div className="flex items-center justify-between w-full">
        <div className="[font-family:'JejuMyeongjo-Regular',Helvetica] text-white text-[32px]">
          {step === 1
            ? "Ticket Selection"
            : step === 2
            ? "Attendee Details"
            : "Ready"}
        </div>
        <div className="font-text-regular-normal text-tingrader-vercel-app-color-grey-98">
          Step {step}/3
        </div>
      </div>
      {/* Progress Bar */}
      <div className="h-1 bg-[#0e464e] w-full rounded-lg overflow-hidden">
        <div
          className={cn("h-full bg-[#23a0b5] transition-all duration-300")}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
