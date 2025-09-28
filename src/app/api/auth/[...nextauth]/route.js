import { mongodbConnect } from "@/lib/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const dynamic = "force-dynamic"
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            //The name of the credential Like It is what credential we use to authenticate the user.
            name: "Credentials",
            //What credential we are going to use like email+password/name+password,
            //Or By which credential we are letting the user to pass.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // credentials = { email: "xxx", password: "yyy" }
                //Here the database logic will go in
                const collection = await mongodbConnect('users')
                const user = await collection.findOne({ email: credentials.email });
                console.log(user)
                //As Example we take A user.
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (!user) return null;
                if (user.password !== credentials.password) return null; // simple plain-text check
                return user; // NextAuth will create a session for this user
            }
        }),
        //Separate provider for google we can add more if we want
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // For first-time login via any provider
            if (user) {
                token.id = user._id || user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        //This session callback is needed to user stay in the website. 
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        }
    }

})

export { handler as GET, handler as POST }