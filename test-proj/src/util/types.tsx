export type EventInfo = {
    id: string,
    title: string,
    description: string,
    date: string,
    address: string,
    featured: boolean,
    image: string
}

export type FBEvents = {
    [key: string]: FBEvent
}

export type FBEvent = {
    title: string,
    image: string,
    description: string,
    date: string,
    address: string,
    featured: boolean
}

export type FBComment = {
    email: string,
    name: string,
    text: string,
}

export type NewFBEntry = {
    name: string
}

export type Comment = {
    id: string,
    email: string,
    name: string,
    text: string,
}