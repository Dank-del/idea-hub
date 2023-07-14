import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

export const authOptions: NextAuthOptions = {
  debug: true,
  // @ts-ignore
  adapter: PrismaAdapter(new PrismaClient()),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     redirect_uri: `${getBaseUrl()}/api/auth/callback/google`,
      //   }
      // }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
