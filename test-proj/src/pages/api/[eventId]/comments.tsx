import { NextApiHandler } from "next";
import { Comment, DBComment, PreDBComment } from "@/util/types";
import { connectDB, findEntries, insertEntry } from "@/util/db-util";
import {MongoClient} from 'mongodb';

const handler: NextApiHandler = async(req, res) => {

    const eventId = req.query.eventId;

    if (typeof eventId !== 'string') {
        res.status(400).json({message: 'Invalid event ID'});
        return;
    }
    
    let client: MongoClient;

    try {
        client = await connectDB();
    }
    catch (error) {
        res.status(500).json({message: 'Connection to database failed'});
        return;
    }

    if (req.method === 'POST') {
        const comment = req.body.comment as PreDBComment;

        if (!comment.name.trim() || !comment.text.trim() || !comment.email.trim()) {
            res.status(400).json({message: 'Invalid input'});
        }
        else {
            try {
                const commentId = await insertEntry(client, 'comments', comment);
                res.status(200).json({comment: {
                    text: comment.text,
                    name: comment.name,
                    id: commentId
                } as Comment});
            }
            catch (error) {
                res.status(500).json({message: 'Connection to database failed'});
            }
        }
    }
    else if (req.method === 'GET') {
        try {
            const comments = await findEntries(client, 'comments', {eventId}, (c: DBComment) => ({
                name: c.name,
                text: c.text,
                id: c._id.toString()
            } as Comment));
            res.status(200).json({comments: comments});
        } 
        catch (error) {
            res.status(500).json({message: 'Connection to database failed'});
        }
    }
    client.close();
    return;
}

export default handler;