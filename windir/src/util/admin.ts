import { AdminPanelGame, Game, GameEntry, WindirEntry, WindirUser } from "./types";

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

export function castToGame(entry: GameEntry, withPlayers=true) {
    const game : any = {
        id: entry._id.toString(),
        day: entry.day,
        time: entry.time,
        image: entry.image
    };
    if (withPlayers) {
        game['players'] = entry.players || [];
    }
    return withPlayers ? game as Game : game as AdminPanelGame;
}