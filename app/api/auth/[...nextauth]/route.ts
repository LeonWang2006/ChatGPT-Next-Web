import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";

async function refreshAccessToken(token: JWT) {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2/0/token`;
    console.log(url);

    const body = new URLSearchParams({
      client_id: process.env.AZURE_AD_TENANT_ID || "AZURE_AD_TENANT_ID",
      client_secret:
        process.env.AZURE_AD_TENANT_SECRET || "AZURE_AD_TENANT_SECRET",
      scope: "email openid profile User.Read offline_access",
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "refreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // AzureADProvider({
    //   name: "Azure AD",
    //   clientId: "72573774-5324-4c0a-8ed4-1b63478997bf" || "azure-ad-client-id",
    //   clientSecret:
    //     "Qr.8Q~q1fG.j9PSxdtx76ndfB3Mz3hiu_VohEcPA" || "azure-ad-client-secret",
    //   tenantId: "5963d619-ea9d-40bf-8f0f-5b90999ea3f9" || "azure-ad-tenant-id",
    //   authorization: {
    //     params: { scope: "email openid profile offline_access" },
    //   },
    // }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials) {
        /*
        LsjsMpwEEgc88Zl9
p2uqAnhjiTvgMAN2
QPWCbrN6oGYDhEDo
che0cinHekOaid0s
nQ1SPXWGe60szhDl
FyHuuMgfdwpqC6qT
InKOnnldwaTTgQRl
cMHLdYJUpAVrcmJm
ZhVFkWzKsb6KqQIy
DwFD68y8kvuejFdy
*/
        const users = [
          { username: "test1@example.com", password: "LsjsMpwEEgc88Zl9" },
          { username: "test2@example.com", password: "p2uqAnhjiTvgMAN2" },
          { username: "test3@example.com", password: "QPWCbrN6oGYDhEDo" },
          { username: "test4@example.com", password: "che0cinHekOaid0s" },
          { username: "test5@example.com", password: "nQ1SPXWGe60szhDl" },
          { username: "test6@example.com", password: "FyHuuMgfdwpqC6qT" },
          { username: "test7@example.com", password: "InKOnnldwaTTgQRl" },
          { username: "test8@example.com", password: "cMHLdYJUpAVrcmJm" },
          { username: "test9@example.com", password: "ZhVFkWzKsb6KqQIy" },
          { username: "test10@example.com", password: "DwFD68y8kvuejFdy" },
        ];
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          if (
            element.username == credentials?.email &&
            element.password == credentials?.password
          ) {
            const user = { id: "1", name: "Admin", email: element.username };
            return user;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET || "JWT_SECRET",
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          user,
        };
      }

      if (
        Date.now() <
          (token as JWT & { accessTokenExpires: number }).accessTokenExpires ||
        0
      ) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      if (session) {
        const profileImageUrl = `https://graph.microsoft.com/v1.0/me/photo/$value`;
        const response = await fetch(profileImageUrl, {
          headers: {
            authorization: `Bearer ${token.accessToken}`,
          },
        });
        const profileData = await response.json();
        session.user = token.user;
        session.error = token.error;
        session.user.access_token_expires_at = token.accessTokenExpires;
        session.expires = token.accessTokenExpires;
        if (response.ok) {
          session.user.profile_image = profileData;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
