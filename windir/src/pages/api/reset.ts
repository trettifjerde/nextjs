import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient, ObjectId } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { hashPassword, isCorrectPassword } from "@/util/auth";
import { WindirEntry } from "@/util/types";

const handler: NextApiHandler = async(req, res) => {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (session) {

            const data = req.body;

            if (!data.id && (!data.password || !data.oldPassword)) {
                res.status(400).json({error: 'Запрос содержит ошибку'});
                return;
            }

            let client: MongoClient;

            try {
                client = await MongoClient.connect(dbUrl);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({error: 'Ошибка подключения к базе данных'});
                return;
            }

            try {
                if (data.id && session.user?.username === 'admin') {
                    const hashedPassword = await hashPassword(process.env.defaultPassword!);
                    const r = await client.db().collection('windir-users').updateOne({_id: new ObjectId(data.id)}, {$set: {password: hashedPassword}});
                    res.status(200).json('');
                }
                else if (session.user && data.password && data.oldPassword) {
                    const user = await client.db().collection('windir-users').findOne({username: session.user.username}) as WindirEntry;
                    if (await isCorrectPassword(data.oldPassword, user.password)) {
                        const hashedPassword = await hashPassword(data.password);
                        const r = await client.db().collection('windir-users').updateOne({username: session.user.username}, {$set: {password: hashedPassword}});
                        res.status(200).json('');
                    }
                    else {
                        res.status(422).json({error: 'Неверный текущий пароль'});
                    }
                }
                else {
                    throw new Error('Something wrong with session or req data, but let us throw 500 anyway');
                }
            }
            catch(error) {
                console.log(error);
                res.status(500).json({error: 'Ошибка подключения к базе данных'});
            }

            client.close();
            return;

        }

        else 
            res.status(401).json({error: 'Ошибка доступа'});
            return;
    }
}

export default handler;