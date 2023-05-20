import { WindirEntry, WindirUser } from "./types";

export function castToUser(entry: WindirEntry) {
    return {
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
        utc: entry.utc
    } as WindirUser
}