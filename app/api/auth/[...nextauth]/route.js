import NextAuth from 'next-auth';
import { connectDB } from '@utils/database';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        console.log(profile);

        //   check if alreaddy exists
        const userExists = await User.findOne({ email: profile.email });
        console.log(
          '🚀 ~ file: route.js:27 ~ signIn ~ userExists:',
          userExists
        );

        //   if not create new user
        if (!userExists) {
          const user = await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
          console.log('🚀 ~ file: route.js:38 ~ signIn ~ user:', user);
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
