import type {Metadata} from "next";
import {Lexend, Merriweather} from "next/font/google";
import "../globals.css";
import Navbar from "@/components/customer/navbar";
import Footer from "@/components/common/footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/toastContainer";
import {UserProvider} from "../contexts/userContext";

config.autoAddCss = false;

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
  title: "Easy Sim",
  description: "Easy Sim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${lexend.variable} ${merriweather.variable} antialiased`}
      >
        <UserProvider>
          <div className="bg-neutral-200 min-h-screen w-full font-lexend text-black flex flex-col">
            <div className="flex justify-center px-4 lg:px-7 py-5">
              <Navbar />
            </div>
            <div className="flex flex-col flex-grow">{children}</div>
            <Footer />
            <ToastProvider />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
