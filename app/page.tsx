import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "./components/buttons.component";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./components/user.component";

export default async function App() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <Home />
      <Analytics />
      <User />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
