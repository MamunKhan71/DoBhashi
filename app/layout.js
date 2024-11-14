import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from "@/components/providers/toaster-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DoBhashi",
  description: "Online Language learning platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    // appearance={{
    //   layout: {
    //     unsafe_disableDevelopmentModeWarnings: true,
    //   },
    // }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastProvider />
          <NextSSRPlugin 
          routerConfig={extractRouterConfig(ourFileRouter)}
          
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
