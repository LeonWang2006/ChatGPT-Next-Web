"use client";
import { Analytics } from "@vercel/analytics/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Home } from "../components/home";
import styles from "./page.module.scss";

export default function Page() {
  // return <h1>wangfl</h1>
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Home />
        <Analytics />
      </>
    );
  } else {
    return (
      <button className={styles["button"]} onClick={() => signIn()}>
        点击进入 ChatGPT
      </button>
    );
  }
}
