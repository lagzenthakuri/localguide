import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/utils/db";
import UserModel from "@/models/userSchema";
import { randomUUID } from "crypto";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      image: string | null;
      totalScore: number;
      role: string;
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: "email profile" } },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    updateAge: 15 * 60, // refresh JWT every 15 minutes
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60,
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connect();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (!existingUser) {
            await new UserModel({
              email: user.email,
              name: user.name,
              image: user.image,
              totalScore: 0,
              role: "User",
            }).save();
          }
          return true;
        } catch (err) {
          console.error("❌ Sign-in error:", err);
          return false;
        }
      }
      return false;
    },

    // 🔥 CRITICAL FIX: Always fetch user data from DB
    async jwt({ token, user, trigger }) {
      await connect();

      // Generate JTI if missing
      if (!token.jti) {
        token.jti = randomUUID();
      }

      // Determine which email to use
      const emailToQuery = user?.email || token.email;

      // ✅ ALWAYS fetch from database to ensure role is present
      if (emailToQuery) {
        try {
          const dbUser = await UserModel.findOne({ email: emailToQuery });

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.email = dbUser.email;
            token.name = dbUser.name;
            token.picture = dbUser.image;
            token.totalScore = dbUser.totalScore ?? 0;
            token.role = dbUser.role ?? "User";
          } else {
            // Fallback if user not found
            token.role = token.role || "User";
          }
        } catch (err) {
          console.error("❌ Error fetching user for JWT:", err);
          token.role = token.role || "User";
        }
      }

      // Timestamps
      const now = Math.floor(Date.now() / 1000);
      token.iat = now;
      token.exp = now + 60 * 60;

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email ?? null,
        name: token.name ?? null,
        image: token.picture ?? null,
        totalScore: (token.totalScore as number) ?? 0,
        role: (token.role as string) ?? "User",
      };

      (session as any).tokenInfo = {
        jti: token.jti,
        exp: token.exp,
        iat: token.iat,
      };

      return session;
    },
  },
};
