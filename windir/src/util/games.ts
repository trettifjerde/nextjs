import { Game, ShortPlayerInfo, WindirEntry, WindirUser } from "./types";

export function getDay(n: number) {
    switch(n) {
        case 1:
            return 'Вт'; 
        case 2:
            return 'Ср';
        case 3:
            return 'Чт';
        case 4:
            return 'Пт';
        case 5:
            return 'Сб';
        case 6:
            return 'Вс';
        default: 
         return 'Пн';
    }
};

export function getLongDay(n: number) {
    switch(n) {
        case 1:
            return 'Вторник'; 
        case 2:
            return 'Среда';
        case 3:
            return 'Четверг';
        case 4:
            return 'Пятница';
        case 5:
            return 'Суббота';
        case 6:
            return 'Воскресенье';
        default: 
         return 'Понедельник';
    }
};

export function makeUserGames(user: ShortPlayerInfo, games: Game[]) {
    return games.map(game => ({gameId: game.id, on: game.players.includes(user.id)}))
}

export function sortGames<T extends {day: number, time: string}>(games: T[]) {
    const sortedGames = [...games];
    sortedGames.sort((a, b) => {
        if (a.day === b.day) return a.time > b.time ? 1 : -1
        else return a.day - b.day;
    });
    return sortedGames;
}

export function sortUsers<T extends {username: string}>(users: Array<T>) {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => a.username > b.username ? 1 : -1);
    return sortedUsers;
}