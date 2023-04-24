"use client";
import { Analytics } from "@vercel/analytics/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Home } from "../components/home";

export default function Page() {
  // return <h1>wangfl</h1>
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* <span className="mr-1">{session?.user?.email}</span>
        <button onClick={() => signOut()}>登出</button> */}
        <Home />
        <Analytics />
      </>
    );
  }
  return <button onClick={() => signIn()}>登录</button>;
}
