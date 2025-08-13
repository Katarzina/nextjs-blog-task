import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q2 Blog",
  description: "Blog application by Q2 Interactive - Místo pro sdílení nápadů a inspirace",
  keywords: ["blog", "Q2", "články", "inspirace"],
  authors: [{ name: "Q2 Interactive" }],
  openGraph: {
    title: "Q2 Blog",
    description: "Místo pro sdílení nápadů a inspirace",
    type: "website",
  },
  other: {
    'link rel="preload" as="image" href': '/image.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <ClientLayout>
            <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'var(--color-bg-gray)' }}>
              <Navigation />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ClientLayout>
        </NotificationProvider>
      </body>
    </html>
  );
}
