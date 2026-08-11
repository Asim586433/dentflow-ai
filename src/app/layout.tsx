import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "DentFlow AI", description: "AI-powered dental patient tracking SaaS." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( <html lang="en"><body>{children}</body></html> );
}
