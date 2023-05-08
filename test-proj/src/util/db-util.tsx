import {MongoClient} from 'mongodb';
import { dbUrl } from "@/data/authKeys";

export function connectDB() {
    return MongoClient.connect(dbUrl);
}

export async function insertEntry(client: MongoClient, collection: string, entry: any) {
    const {insertedId} = await client.db().collection(collection).insertOne(entry);
    return insertedId.toString();
}

export async function findEntries<T>(
    client: MongoClient, 
    collection: string, 
    filter: {[key: string]: string},
    format: (c: any) => T
) {
    const entries = await client.db().collection(collection).find(filter).sort({_id: -1}).toArray();
    return entries.map(entry => format(entry));
}
