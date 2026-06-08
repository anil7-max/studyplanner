import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GroHy — Crack Your Dream Placement",
  description:
    "GroHy is an AI-powered placement preparation platform. Master aptitude, coding, resume building, interviews, and career skills in one place.",
  keywords: [
    "GroHy",
    "placement preparation",
    "aptitude test",
    "resume builder",
    "mock interview",
    "career guidance",
    "AI mentor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
