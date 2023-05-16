import { dbUrl } from "@/util/appKeys";
import { isCorrectPassword } from "@/util/auth";
import { MongoClient } from "mongodb";

export async function POST(req: Request) {
    const data = await req.json();
    console.log(data);

    if (!data.username || !data.password) {
        return new Response(JSON.stringify({error: 'Заполните поля'}), {status: 422})
    }

    let client: MongoClient;

    try {
        client = await MongoClient.connect(dbUrl);
    }
    catch(error) {
        console.log(error);
        return new Response(JSON.stringify({error: 'Ошибка доступа к данным. Попробуйте позже'}), {status: 503})
    }

    try {
        const user = await client.db().collection('windir-users').findOne({username: data.username});
        if (!user || !await isCorrectPassword(data.password, user.password)) {
            client.close();
            return new Response(JSON.stringify({error: 'Неверный позывной или пароль'}), {status: 401})
        }

        client.close();
        return new Response(JSON.stringify({token: 'wogwogngo'}), {status: 200})

    }
    catch(error) {
        console.log(error);
        client.close();
        return new Response(JSON.stringify({error: 'Ошибка доступа к данным. Попробуйте позже'}), {status: 503})
    }


}