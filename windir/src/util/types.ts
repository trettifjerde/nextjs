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
    hours: number,
    teams: string,
    password: string,
    isActive: boolean
}

export type WindirUser = {
    id: string,
    specs: string[],
    projects: string[],
    username: string,
    dob: string,
    contact: string,
    hours: number,
    teams: string,
    password: string,
    isActive: boolean
}