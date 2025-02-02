import { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { providers } from './providers';

export const authConfig: NextAuthConfig = {
  // adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers,
  callbacks: {
    async session({ session, token }) {
      console.log(session);
      if (!session.user?.email) return session;
      return {
        ...session,
        user: {
          ...session.user,
          token,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  debug: true,
};
