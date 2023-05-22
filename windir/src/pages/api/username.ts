import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { MongoClient } from "mongodb";
import { dbUrl } from "@/util/appKeys";
import { WindirEntry } from "@/util/types";

const handler : NextApiHandler = async(req, res) => {
    if (req.method === 'GET' || req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if (session && session.user) {
            const username = session.user.username;
            let client: MongoClient;

            try {
                client = await MongoClient.connect(dbUrl);
            }
            catch(error) {
                res.status(500).json({error: 'Ошибка доступа к базе данных'});
                return;
            }

            try { 
                const user = await client.db().collection('windir-users').findOne({username: session.user.username}) as WindirEntry;

                if (!user) {
                    throw new Error('');
                }

                if (req.method === 'POST') {
                    const data = req.body;
                    const r = await client.db().collection('windir-users').updateOne({username: session.user.username}, {$set: {newUsername: data.username}});
                    res.status(200).json('');
                }
                else {
                    res.status(200).json({name: user.newUsername ? user.newUsername : ''});
                }
            }
            catch(error) {
                res.status(500).json({error: 'Ошибка доступа к базе данных'});
            }

            client.close();
            return;
        }
        res.status(401).json({error: 'Ошибка доступа'});
        return;
    }
};
export default handler;