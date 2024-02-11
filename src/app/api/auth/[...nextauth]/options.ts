import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const options: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        // console.log('Profile Github', profile);

        let userRole = 'Github User';
        if (profile?.email == process.env.ADMIN) {
          userRole = 'admin';
        }

        return {
          ...profile,
          role: userRole,
          image: profile.avatar_url,
          name: profile.login,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        // console.log('Profile Google', profile);

        let userRole = 'Google User';
        if (profile?.email == process.env.ADMIN) {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: ' Username',
          type: 'text',
          placeholder: 'Username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials, req) {
        const user = { id: '42', name: 'Dave', password: 'nextauth' };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else return null;
      },
    }),
  ],
};
