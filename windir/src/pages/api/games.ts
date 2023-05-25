import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient, ObjectId } from "mongodb";
import { dbUrl } from "@/util/appKeys";

const handler: NextApiHandler = async(req, res) => {
    if (req.method === 'POST') {
        const data = req.body; //{gameId: gameId, userId: user.id, on: !on}
        const session = await getServerSession(req, res, authOptions);
        
        if (session?.user?.username !== 'admin' && session?.user?.id !== data.userId) {
            res.status(401).json({error: 'Доступ к редактированию запрещен'})
            return;
        }

        try {
            const client = await MongoClient.connect(dbUrl);
            try {
                const operators = data.on ? {$push: {players: data.userId}} : {$pull: {players: data.userId}};
                const updEntry = await client.db().collection('windir-games').updateOne({_id: new ObjectId(data.gameId)}, operators);
                console.log (updEntry);
                res.status(200).json('');
                client.close();
                return;
            }
            catch(error) {
                client.close();
                throw error;
            }
        }
        catch (error) {
            res.status(500).json({error: 'Ошибка доступа к базе данных. Повторите позже'});
            return;
        }

    }
}

export default handler;