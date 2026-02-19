import type { Metadata } from "next";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenith | Agency & Freelancer Dashboard",
  description: "Manage your web development projects and clients efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zenith-bg text-zinc-100 min-h-screen flex">
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}