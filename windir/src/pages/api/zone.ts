import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";

const handler : NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        
        if (session && session.user) {
            const data = req.body;
            let client: MongoClient;

            try {
                client = await MongoClient.connect(dbUrl);
                const r = await client.db().collection('windir-users').updateOne({username: session.user.username}, {$set: {utc: data.utc}});
                client.close();
                res.status(200).json('');
                return;
            }
            catch(error) {
                res.status(500).json({error: 'Ошибка подключения к базе данных'});
                return;
            }
        }
        res.status(401).json({error: 'Ошибка доступа'});
        return;
    }
}
export default handler;