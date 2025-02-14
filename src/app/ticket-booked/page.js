"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/ui/progress";
import html2canvas from "html2canvas";
import bwipjs from "bwip-js";

const TicketBooked = () => {
  const router = useRouter();
  const ticketRef = useRef(null);
  const barcodeRef = useRef(null);
  const [barcodeImgSrc, setBarcodeImgSrc] = useState("");
  const [ticketData, setTicketData] = useState({
    fullName: "",
    email: "",
    ticketType: "",
    ticketQuantity: "",
    specialRequest: "",
    imageUrl: "",
  });

  useEffect(() => {
    // get stored details
    const storedAttendee = localStorage.getItem("attendeeDetails");
    const storedTicketType = localStorage.getItem("selectedTicket");

    if (storedAttendee && storedTicketType) {
      try {
        const attendeeData = JSON.parse(storedAttendee);
        const selectionData = JSON.parse(storedTicketType);

        setTicketData({
          fullName: attendeeData.name || "Attendee Name",
          email: attendeeData.email || "user@email.com",
          specialRequest: attendeeData.specialRequest || "None",
          ticketQuantity: selectionData.quantity || "1",
          ticketType: selectionData.type || "General",
          imageUrl:
            localStorage.getItem("uploadedImage") || "https://via.placeholder.com/140",
        });
      } catch (error) {
        console.error("Error parsing attendee details:", error);
      }
    }

    // Generate Barcode
    if (ticketData.email && barcodeRef.current) {
      try {
        bwipjs.toCanvas(barcodeRef.current, {
          bcid: "code128",
          text: ticketData.email,
          scale: 3,
          height: 10,
          width: 200,
          includetext: false,
          textxalign: "center",
        });
        // Convert barcode canvas to image
        setTimeout(() => {
          const barcodeCanvas = barcodeRef.current;
          if (barcodeCanvas) {
            const barcodeImg = new Image();
            barcodeImg.src = barcodeCanvas.toDataURL("image/png");

            barcodeImg.onload = () => {
              setBarcodeImgSrc(barcodeImg.src);
            };
          }
        }, 500);
      } catch (error) {
        console.error("Barcode generation failed:", error);
      }
    }
  }, [ticketData.email]);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    if (!barcodeImgSrc) {
      console.warn("Barcode image not ready yet...");
      return;
    }

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          useCORS: true,
          scale: 3,
          backgroundColor: null,
        });

        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "Techember_Ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          router.push("/ticket-selection");
        }, 3000);
      } catch (error) {
        console.error("Ticket download failed:", error);
      }
    }, 500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#041e22] px-4">
      <Card
        className="relative w-full max-w-[90%] md:max-w-[700px] lg:max-w-[900px]
        p-6 md:p-12 rounded-3xl border border-[#0e464f] bg-[#041e22]
        shadow-[inset_0px_0px_10px_2px_rgba(35,160,181,0.3)]"
      >
        <ProgressBar step={3} />

        <CardContent className="flex flex-col items-center gap-8 relative z-10">
          <Card className="w-full bg-[#08252b] rounded-[32px] border-[#0e464e]">
            <CardContent className="p-6 flex flex-col gap-8 items-center">
              {/* Title */}
              <h1 className="[font-family:'JejuMyeongjo-Regular',Helvetica] text-white text-[24px] md:text-[32px] leading-normal text-center">
                Your Ticket is Booked!
              </h1>

              {/* Icon & Info */}
              <CheckCircleIcon className="w-16 md:w-24 h-16 md:h-24 text-[#23a0b5]" />
              <p className="text-white text-center text-sm md:text-lg">
                Check your email for a copy or you can download
              </p>
              <div className="w-full h-1 bg-[#07363e]" />

              {/* Ticket Preview */}
              <div ref={ticketRef} className="w-full max-w-[90%] md:max-w-[600px] lg:max-w-[800px] mx-auto">
                <Card className="w-full p-4 md:p-6 border border-gray-300 bg-transparent">
                  <CardContent className="flex flex-col items-center p-0">
                    <div
                      className="relative w-[250px] md:w-[300px] h-[500px] md:h-[600px]
                      bg-[url(https://c.animaapp.com/8DaHd5Um/img/subtract.svg)] bg-[100%_100%]"
                    >
                      <div
                        className="absolute w-[220px] md:w-[262px] h-[380px] md:h-[448px] top-[19px] left-[19px] p-3.5
                        bg-[#031d211a] rounded-2xl border border-solid border-[#23a0b5]
                        backdrop-blur-sm flex flex-col items-center gap-5"
                      >
                        <div className="flex flex-col items-center w-[150px] md:w-[175px] mt-2">
                          <h2 className="[font-family:'Road_Rage',Helvetica] text-white text-[24px] md:text-[34px] text-center leading-[24px] md:leading-[34px]">
                            Techember Fest '25
                          </h2>
                          <div className="flex flex-col items-center gap-1 p-1">
                            <p className="[font-family:'Roboto',Helvetica] text-white text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                              📍 04 Rumens road, Ikoyi, Lagos
                            </p>
                            <p className="[font-family:'Roboto',Helvetica] text-white text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                              📅 March 15, 2025 | 7:00 PM
                            </p>
                          </div>
                        </div>

                        {/* Dynamically Loaded Profile Image */}
                        {ticketData?.imageUrl && (
                          <img
                            className="w-[100px] md:w-[140px] h-[100px] md:h-[140px] object-cover rounded-full"
                            alt="Attendee Profile"
                            src={ticketData.imageUrl}
                            crossOrigin="anonymous"
                          />
                        )}

                        <div className="flex flex-col w-full bg-[#07333c] rounded-lg border border-solid border-[#123d43]">
                          <div className="flex border-b border-[#12464e]">
                            <div className="flex-1 border-r border-[#12464e] p-1">
                              <p className="text-white/30 text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                                Full Name
                              </p>
                              <p className="font-bold text-xs text-white">
                                {ticketData.fullName}
                              </p>
                            </div>
                            <div className="flex-1 p-1">
                              <p className="text-white/30 text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                                Email
                              </p>
                              <p className="font-bold text-xs text-white">
                                {ticketData.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex border-b border-[#12464e]">
                            <div className="flex-1 border-r border-[#12464e] p-1">
                              <p className="text-white/30 text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                                Ticket Type
                              </p>
                              <p className="text-[8px] md:text-[10px] text-white leading-[10px] md:leading-[15px]">
                                {ticketData.ticketType}
                              </p>
                            </div>
                            <div className="flex-1 p-1">
                              <p className="text-white/30 text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                                Ticket Quantity
                              </p>
                              <p className="text-[8px] md:text-[10px] text-white leading-[10px] md:leading-[15px]">
                                {ticketData.ticketQuantity}
                              </p>
                            </div>
                          </div>

                          <div className="p-2">
                            <p className="text-white/30 text-[8px] md:text-[10px] leading-[10px] md:leading-[15px]">
                              Special Request
                            </p>
                            <p className="text-[8px] md:text-[10px] text-white leading-[10px] md:leading-[15px]">
                              {ticketData.specialRequest}
                            </p>
                          </div>
                        </div>

                        {/* Barcode Canvas */}
                        {barcodeImgSrc ? (
                          <img
                            src={barcodeImgSrc}
                            alt="Barcode"
                            className="mt-4 w-full h-12"
                          />
                        ) : (
                          <canvas
                            ref={barcodeRef}
                            className="mt-4 w-full h-12"
                          ></canvas>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
                <Button
                  className="md:w-1/2 bg-[#23a0b5] py-3"
                  onClick={downloadTicket}
                >
                  Download Ticket
                </Button>
                <Button
                  className="md:w-1/2 text-black border-[#23a0b5] bg-white py-3"
                  onClick={() => router.push("/")}
                >
                  Book Another Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketBooked;
