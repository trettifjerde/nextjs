import { dbUrl } from "@/util/appKeys";
import { castToDbEntry, cleanRegisterFormData } from "@/util/register";
import { MongoClient } from "mongodb";

export async function POST(req: Request) {
    const data = await req.json()
    const {cleanedData, errors} = cleanRegisterFormData(data);
    if (Object.keys(errors).length > 0) {
        return new Response(JSON.stringify(errors), {status: 422})
    }
    else {
        let client: MongoClient;

        try {
            client = await MongoClient.connect(dbUrl);
        }
        catch (error) {
            console.log(error);
            return new Response(JSON.stringify({error: 'Ошибка при сохранении заявки. Повторите позже'}), {status: 503})
        }

        try {
            const username = await client.db().collection('windir-users').findOne({username: cleanedData.username});
            if (username) {
                client.close();
                return new Response(JSON.stringify({error: 'Пользователь с таким позывным уже зарегистрирован'}), {status: 401})
            }

            const contact = await client.db().collection('windir-users').findOne({contact: cleanedData.contact});
            if (contact) {
                client.close();
                return new Response(JSON.stringify({error: 'Пользователь с такой контактной информацией уже зарегистрирован'}), {status: 401})
            }

            const entry = await castToDbEntry(cleanedData);
            await client.db().collection('windir-users').insertOne(entry);
            client.close();
            return new Response('', {status: 200})
        }
        catch (error) {
            console.log(error);
            client.close();
            return new Response(JSON.stringify({error: 'Ошибка при сохранении заявки. Повторите позже'}), {status: 503})
        }      
    }
}