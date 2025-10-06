import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { prisma } from "../../../../lib/prisma"
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "john" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {  //constructs the jwt token
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.password || !credentials.email) {
                    throw new Error("Invalid request!")
                }
                await prisma.$connect();
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })

                if (user) {
                    if (!bcrypt.compareSync(credentials.password, user.password)) {
                        throw new Error("Email or Password incorrect!")
                    }
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error("username or password incorrect")

                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 20 * 24 * 60 * 60 //30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            // The user object is only available when the user logs in. On subsequent requests, the token is used
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
                token.profilePic = user.profilePic;
                token.createdAt = user.createdAt;
                token.otp = user.otp;
                token.verified = user.verified;
            }
            return token
        },
        async session({ session, token }) { //this user came from what we returned in the authorize fn
            // This callback modifies the session object that is sent to the client.
            // Runs every time useSession() or getSession() is called on the client.
            // Uses data from the token (not user, since user data is only available on login).

            // console.log("token in session:"+token);
            if (token) {
                const data = token as unknown as User
                session.user.id = data.id;
                session.user.name = data.username;
                session.user.email = data.email;
                session.user.createdAt = data.createdAt;
                session.user.profilePic = data.profilePic;
                session.user.otp = data.otp;
                session.user.verified = data.verified;
            }
            return session
        }
    },
    pages: {
        error: '/login',
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}