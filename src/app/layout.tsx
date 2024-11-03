import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from 'react';
import { AuthProvider } from '../context/AuthContext';

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

export const metadata: Metadata = {
  title: "Streak Snap",
  description: "Track and manage your streaks with Streak Snap.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>Streak Snap</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
