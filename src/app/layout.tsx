"use client"; // Required because Provider must be in a Client Component

import { Provider } from "react-redux";
import { store } from "../app/store/index";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
