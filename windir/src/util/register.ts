import { hashPassword } from "./auth";
import { isEmailValid } from "./validators";

export function cleanRegisterFormData(data: {[key: string]: any}, validate=true) {
    const cleanedData: {[key: string]: string | number | string[]} = {
        specs: [] as string[],
        projects: [] as string[]
    };
    const errors: {[key: string]: string} = {};

    for (const [key, value] of Object.entries(data)) {
        switch (key) {
            case 'username':
                cleanedData[key] = value.toString().trim();
                break;
            case 'hours':
                cleanedData[key] = +value.toString();
                break;
            case 'specs': 
            case 'projects':
                cleanedData[key] = value;
                break;
            default:
                if (key.startsWith('spec')) {
                    (cleanedData.specs as string[]).push(key.slice(5))
                }
                else if (key.startsWith('project')) {
                    (cleanedData.projects as string[]).push(key.slice(8))
                }
                else {
                    cleanedData[key] = value;
                }
        }
    }

    if (validate) {
        if (!cleanedData.username)
            errors.username = 'Обязательное поле';
        if (!cleanedData.password1)
            errors.password1 = 'Обязательное поле';
        if (!cleanedData.password2) {
            errors.password2 = 'Обязательное поле';
        }
        if (!cleanedData.dob) 
            errors.dob = 'Обязательное поле';

        if (!cleanedData.contact) 
            errors.contact = 'Обязательное поле';
        else if (!cleanedData.telegram && !isEmailValid(cleanedData.contact as string)) {
            errors.contact = 'Неверный формат почты';
        }

        if (cleanedData.password1 && cleanedData.password2 && cleanedData.password1 !== cleanedData.password2)
            errors.password2 = 'Пароли не совпадают';

        if (!cleanedData.hours) 
            errors.hours = 'Обязательное поле';
        else if (typeof cleanedData.hours === 'number' && cleanedData.hours < 1)
            errors.hours = 'Неверное значение';
    }

    return {cleanedData, errors};
}

export async function castToDbEntry(data: any) {
    const dbEntry = {...data};
    const password = data.password1;
    delete dbEntry.password1;
    delete dbEntry.password2;
    const hashedPassword = await hashPassword(password);
    dbEntry.password = hashedPassword;
    dbEntry.isActive = false;
    return dbEntry;
}