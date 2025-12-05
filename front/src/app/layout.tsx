import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "Manage users efficiently"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}


