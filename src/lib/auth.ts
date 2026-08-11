import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  { id: "1", name: "Dr. John Smith", email: "admin@dentflow.ai", password: "password123", role: "ADMIN", image: "https://ui-avatars.com/api/?name=John+Smith&background=2563eb&color=fff" },
  { id: "2", name: "Sarah Receptionist", email: "staff@dentflow.ai", password: "password123", role: "STAFF", image: "https://ui-avatars.com/api/?name=Sarah+R&background=0d9488&color=fff" }
];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = users.find(u => u.email === credentials.email);
        if (user && user.password === credentials.password) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.role = (user as any).role; token.id = (user as any).id; }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { (session.user as any).role = token.role; (session.user as any).id = token.id; }
      return session;
    }
  },
  pages: { signIn: "/login" },
  secret: "DentFlowSuperSecretKeyForVercelDeployment2024"
};
