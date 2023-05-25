import { ObjectId } from "mongodb";

export type PageData = {
    title: string,
    image: string,
    styles: string
}

export type PlayerGames = {[key: string]: boolean[]};

export type WindirEntry = {
    _id: ObjectId,
    specs: string[],
    projects: string[],
    username: string,
    dob: string,
    contact: string,
    utc: string,
    hours: number,
    teams: string,
    password: string,
    isActive: boolean,
    isNew: boolean,
    newUsername?: string
}

export type WindirUser = {
    id: string,
    specs: string[],
    projects: string[],
    username: string,
    dob: string,
    utc: string,
    contact: string,
    hours: number,
    teams: string,
    password: string,
    isActive: boolean
    isNew: boolean,
    newUsername?: string
}

export type UsernameChangeEntry = {id: string, oldN: string, newN: string}

export type Game = {
    id: string,
    day: number,
    time: string,
    image: string,
    players: string[]
}

export type GameEntry = {
    _id: ObjectId,
    day: number,
    time: string,
    image: string,
    players?: string[]
}

export type ShortPlayerInfo = {
    username: string,
    id: string
}