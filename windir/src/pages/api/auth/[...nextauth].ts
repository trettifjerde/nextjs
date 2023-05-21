import { dbUrl } from "@/util/appKeys";
import { isCorrectPassword } from "@/util/auth";
import { WindirEntry } from "@/util/types";
import { Document, MongoClient } from "mongodb";
import { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions : AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    jwt: {
        maxAge: 60 * 60,
    },
    callbacks: {
        jwt({token, user}) {
            if (user)
                token.user = user;
            return token;
        },
        session: async({session, token}) => {
            if (token)
                session.user = token.user as User
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [Credentials({
        name: '',
        credentials: {
            username: {type: 'text', placeholder: 'Позывной'},
            password: {type: 'password', placeholder: 'Пароль'}
        },
        async authorize(credentials) {

            if (!credentials || !credentials.username || !credentials.password) {
                throw new Error('Заполните поля');
            }

            let client: MongoClient;

            try {
                client = await MongoClient.connect(dbUrl);
            }
            catch(error) {
                console.log(error);
                throw new Error('Ошибка доступа к данным. Попробуйте позже');
            }

            let user: Document | null;

            try {
                user = await client.db().collection('windir-users').findOne({username: credentials.username});
            }
            catch(error) {
                console.log(error);
                client.close();
                throw new Error('Ошибка доступа к данным. Попробуйте позже');
            }

            if (!user || !await isCorrectPassword(credentials.password, user.password)) {
                throw new Error('Неверный позывной или пароль');
            }
            if (user.username !== 'admin' && !user.isActive) {
                throw new Error('Доступ к профилю не активирован');
            }
            return {id: user._id.toString(), username: user.username, utc: user.utc};          
        }
    })]
};

const handler = NextAuth(authOptions)

export default handler;