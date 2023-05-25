import { dbUrl } from "@/util/appKeys";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler : NextApiHandler = async (req, res) => {
    
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (session?.user?.username !== 'admin') {
            res.status(401).json({error: 'Доступ запрещен'});
            return;
        }

        try {
            const data = req.body;
            const client = await MongoClient.connect(dbUrl);
            const r = await client.db().collection('windir-games').insertOne(data);
            const id = r.insertedId.toString();
            client.close();
            res.status(200).json({id});
            return;
        }
        catch(error) {
            console.log(error);
            res.status(500).json({error: 'Ошибка подключения к базе данных'});
            return;
        }
    }
    
}
export default handler;