import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

export const authController = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    signIn({ user }) {
      return true;
    },
    jwt({ token, user }) {
      token.id = user.id;

      return token;
    },
    session({ session, newSession, user }) {
      newSession = session;

      newSession.user.id = user.id;

      return newSession;
    }
  }
});
