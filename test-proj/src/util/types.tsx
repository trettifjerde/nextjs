export type EventInfo = {
    id: string,
    title: string,
    description: string,
    date: string,
    address: string,
    featured: boolean
}

export type FBEvents = {
    [key: string]: FBEvent
}

export type FBEvent = {
    title: string,
    description: string,
    date: string,
    address: string,
    featured: boolean
}