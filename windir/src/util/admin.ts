import { Game, GameEntry, WindirEntry, WindirUser } from "./types";

export function castToUser(entry: WindirEntry) {
    const user : WindirUser = {
        id: entry._id.toString(),
        specs: entry.specs,
        projects: entry.projects,
        username: entry.username,
        dob: entry.dob,
        contact: entry.contact,
        hours: entry.hours,
        teams: entry.teams,
        password: entry.password,
        isActive: entry.isActive,
        isNew: entry.isNew,
        utc: entry.utc,
    };

    if (entry.newUsername) user.newUsername = entry.newUsername;
    
    return user;
}

export function castToGame(entry: GameEntry) {
    return {
        id: entry._id.toString(),
        day: entry.day,
        time: entry.time,
        players: entry.players || [],
        image: entry.image
    } as Game
}