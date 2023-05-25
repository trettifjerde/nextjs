import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        id: string,
        username: string,
        utc?: string
    }

    interface Session extends DefaultSession {
        user?: {
            id: string,
            username: string,
            utc?: string
        }
    }
}