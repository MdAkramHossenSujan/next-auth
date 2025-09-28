import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
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

                //As Example we take A user.
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (!user) return null;
                console.log(credentials)
                if (user.password !== credentials.password) return null; // simple plain-text check
                return user; // NextAuth will create a session for this user
            }
        })

    ]
})

export { handler as GET, handler as POST }