import { NextApiHandler } from "next";
import { MongoClient } from 'mongodb';
import { connectDB, insertEntry } from "@/util/db-util";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const email = req.body.email;

        if (!email) {
            return res.status(422).json({message: 'Invalid input'});
        }

        let client: MongoClient;

        try {
            client = await connectDB();
        } catch (error) {
            res.status(500).json({message: 'Connection to database failed'});
            return;
        }

        try {
            const id = await insertEntry(client, 'emails', {email});
            res.status(200).json({message: `Email ${email} is subscribed to newsletter`})
        } 
        catch (error) {
            res.status(500).json({message: 'Connection to database failed'})
        }
        client.close();
        return;
    }
}
export default handler;