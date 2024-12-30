import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/libs/storeProvider";
import { AppDispatch } from "@/libs/store";
import { useDispatch } from "react-redux";

export const metadata: Metadata = {
  title: "ジャルジャルでイントロクイズする奴",
  description: "ジャルジャルでイントロクイズする奴",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
