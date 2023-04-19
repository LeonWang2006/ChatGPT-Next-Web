import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user }) {
      let isAllowedToSignIn = true;
      const allowedUser = ["YOURGITHUBACCID"];
      console.log(user);
      if (allowedUser.includes(String(user.id))) {
        isAllowedToSignIn = true;
      } else {
        isAllowedToSignIn = false;
      }
      return isAllowedToSignIn;
    },
  },
};

export default NextAuth(authOptions);
