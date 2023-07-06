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

export const authOptions: NextAuthOptions = {
  debug: true,
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async redirect(params: { url: string }) {
      const { url } = params

      // url is just a path, e.g.: /videos/pets
      if (!url.startsWith('http')) return url

      // If we have a callback use only its relative path
      const callbackUrl = new URL(url).searchParams.get('callbackUrl')
      if (!callbackUrl) return url

      return new URL(callbackUrl as string).pathname
    },
  },
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
