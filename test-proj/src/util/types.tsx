import {ObjectId} from 'mongodb';

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

export type DBComment = {
    email: string,
    name: string,
    text: string,
    eventId: string,
    _id: ObjectId
}

export type FBComment = {
    email: string,
    name: string,
    text: string,
}

export type PreDBComment = {
    email: string,
    name: string,
    text: string,
    eventId: string
}

export type NewFBEntry = {
    name: string
}

export type Comment = {
    id: string,
    name: string,
    text: string,
}

export type NotificationStatus = 'pending' | 'success' | 'error'

export type Notification = {
    title: string,
    message: string,
    status: NotificationStatus
}