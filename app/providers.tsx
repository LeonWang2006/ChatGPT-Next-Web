"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProvidersProps = {
  children?: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
