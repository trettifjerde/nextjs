import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient, ObjectId } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { WindirEntry } from "@/util/types";

const handler : NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);

        if (session && session.user && session.user.username === 'admin') {
            const data = req.body;

            try {
                const client = await MongoClient.connect(dbUrl);
                const user = await client.db().collection('windir-users').findOne({_id: new ObjectId(data.id)}) as WindirEntry | null;

                if (!user || !user.newUsername) {
                    res.status(400).json({error: 'Заявка не найдена'});
                    client.close();
                    return;
                }

                const resolve = data.confirm ? [{$set: {username: user.newUsername}}, {$unset: ["newUsername"]}] : 
                    {$unset: {newUsername: ""}};

                const r = await client.db().collection('windir-users').updateOne({_id: user._id}, resolve);
                res.status(200).json('');
                client.close();
                return;
            }
            catch(error) {
                console.log(error);
                res.status(500).json({error: 'Ошибка доступа к базе данных'});
                return;
            }
        }
        res.status(401).json({error: 'Нет прав для доступа'});
        return;
    }
}
export default handler;