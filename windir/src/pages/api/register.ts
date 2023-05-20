import { dbUrl } from "@/util/appKeys";
import { castToDbEntry, cleanRegisterFormData } from "@/util/register";
import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const handler : NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        const {cleanedData, errors} = cleanRegisterFormData(data);

        if (Object.keys(errors).length > 0) {
            res.status(422).json(errors);
            return;
        }
        else {
            let client: MongoClient;

            try {
                client = await MongoClient.connect(dbUrl);
            }
            catch (error) {
                console.log('first try', error);
                res.status(500).json({error: 'Ошибка при сохранении заявки. Повторите позже'});
                return;
            }

            try {
                const username = await client.db().collection('windir-users').findOne({username: cleanedData.username});
                if (username) {
                    client.close();
                   res.status(401).json({error: 'Пользователь с таким позывным уже зарегистрирован'});
                   return;
                }

                const contact = await client.db().collection('windir-users').findOne({contact: cleanedData.contact});
                if (contact) {
                    client.close();
                    res.status(401).json({error: 'Пользователь с такой контактной информацией уже зарегистрирован'})
                    return;
                }

                const entry = await castToDbEntry(cleanedData);
                await client.db().collection('windir-users').insertOne(entry);
                client.close();
                res.status(200).json('');
                return;
            }
            catch (error) {
                console.log('second try', error);
                client.close();
                res.status(503).json({error: 'Ошибка при сохранении заявки. Повторите позже'});
                return;
            }      
        }
    }
}

export default handler;