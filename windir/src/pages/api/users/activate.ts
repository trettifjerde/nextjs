import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";

const handler: NextApiHandler = async(req, res) => {
    if (req.method === 'POST') {

        const session = await getServerSession(req, res, authOptions);

        if (session?.user?.username === 'admin') {
            const data = req.body;
            let client: MongoClient;

            try {client = await MongoClient.connect(dbUrl)}
            catch(error) {
                console.log(error);
                res.status(500).json({error: 'Ошибка доступа к базе данных'});
                return;
            }

            try {
                const r = await client.db().collection('windir-users').updateOne({username: data.username}, {$set: {isActive: data.isActive}});
                res.status(200).json('');
                client.close();
                return;
            }
            catch(error) {
                console.log(error);
                client.close();
                res.status(500).json({error: 'Ошибка доступа к базе данных'});
                return;
            }
        }
        else {
            res.status(401).json({error: 'Ошибка доступа'});
            return;
        }
    }
}

export default handler;