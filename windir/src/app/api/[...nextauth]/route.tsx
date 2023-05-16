import { dbUrl } from "@/util/appKeys";
import { isCorrectPassword } from "@/util/auth";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [Credentials({
        name: '',
        credentials: {
            username: {type: 'text', placeholder: 'Позывной'},
            password: {type: 'password', placeholder: 'Пароль'}
        },
        async authorize(credentials, req) {

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

            try {
                const user = await client.db().collection('windir-users').findOne({username: credentials.username});
                if (!user || !await isCorrectPassword(credentials.password, user.password)) {
                    client.close();
                    throw new Error('Неверный позывной или пароль');
                }

                client.close();
                return {id: user.username};

            }
            catch(error) {
                console.log(error);
                client.close();
                throw new Error('Ошибка доступа к данным. Попробуйте позже');
            }

        }
    })]
})

export {handler as GET, handler as POST};