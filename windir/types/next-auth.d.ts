import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        username: string,
        utc?: string
    }

    interface Session extends DefaultSession {
        user?: {
            username: string,
            utc?: string
        }
    }
}