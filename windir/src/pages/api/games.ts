import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";

const handler: NextApiHandler = async(req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        const session = await getServerSession(req, res, authOptions);
        console.log(session);
        
        if (session?.user?.username !== 'admin' && session?.user?.username !== data.username) {
            res.status(401).json({error: 'Доступ к редактированию запрещен'})
            return;
        }

        let client: MongoClient;

        try {
            client = await MongoClient.connect(dbUrl);
        }
        catch (error) {
            console.log('first try block', error);
            res.status(500).json({error: 'Ошибка доступа к базе данных. Повторите позже'});
            return;
        }

        try {
            const updEntry = await client.db().collection('windir-games').updateOne({username: data.username}, {$set: {games: data.games}});
            console.log (updEntry);
            res.status(200).json('');
            client.close();
            return;
        }
        catch(error) {
            console.log('second try block', error);
            res.status(500).json({error: 'Ошибка доступа к базе данных. Повторите позже'});
            client.close();
            return;
        }
        
    }
}

export default handler;