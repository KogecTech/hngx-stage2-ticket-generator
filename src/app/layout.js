import Navbar from "@/components/navbar"; 
import "./globals.css"; 

export const metadata = {
  title: "Conference Ticket Generator",
  description: "Book your conference tickets seamlessly",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
