import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from '@prisma/client';

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL)
    // reference for vercel.com
    return `https://ideahub.sayanbiswas.in`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const prisma = new PrismaClient();

console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('BASE_URL:', getBaseUrl());

export const authOptions: NextAuthOptions = {
  debug: true,
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: `${getBaseUrl()}/api/auth/callback/google`,
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
