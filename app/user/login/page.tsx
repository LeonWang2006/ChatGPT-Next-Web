"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <span className="mr-1">{session?.user?.email}</span>
        <button onClick={() => signOut()}>登出</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>登录</button>;
}
