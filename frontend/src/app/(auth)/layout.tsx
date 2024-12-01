import type {Metadata} from "next";
import {Lexend, Merriweather} from "next/font/google";
import "../globals.css";
import ToastProvider from "@/components/toastContainer";
import "react-toastify/dist/ReactToastify.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${lexend.variable} ${merriweather.variable} antialiased`}
      >
        <div
          className="w-full relative h-screen bg-cover bg-center flex justify-center items-center"
          style={{backgroundImage: "url('carrier-auth-bg.jpg')"}}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30 h-screen" />
          {children}
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
