import { dbUrl } from "@/util/appKeys";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";

const handler : NextApiHandler = async (req, res) => {
    
    if (req.method === 'POST') {
        const session = await getServerSession();

        if (session?.user?.username !== 'admin') {
            res.status(401).json({error: 'Доступ запрещен'});
            return;
        }

        try {
            const {id, ...data} = req.body;
            const client = await MongoClient.connect(dbUrl);
            const r = await client.db().collection('windir-games').updateOne({id: new ObjectId(id)}, {$set: data});
            client.close();
            res.status(200).json('');
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