import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient, ObjectId } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { hashPassword } from "@/util/auth";

const handler: NextApiHandler = async(req, res) => {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (session) {

            const data = req.body;

            if (!data.password && !data.id) {
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
                if (data.password && session.user) {
                    const hashedPassword = await hashPassword(data.password);
                    const r = await client.db().collection('windir-users').updateOne({username: session.user.username}, {$set: {password: hashedPassword}});
                    res.status(200).json('');
                }
                else if (data.id && session.user?.username === 'admin') {
                    const hashedPassword = await hashPassword(process.env.defaultPassword!);
                    const r = await client.db().collection('windir-users').updateOne({_id: new ObjectId(data.id)}, {$set: {password: hashedPassword}});
                    res.status(200).json('');
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