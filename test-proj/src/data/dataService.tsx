import { Comment, EventInfo, FBComment, FBEvent, FBEvents, NewFBEntry } from "@/util/types";

export async function fetchEvents() : Promise<{data: EventInfo[], error: string}>{
    const events = await fetch('https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events.json')
        .then(res => res.json())
        .then((data: FBEvents) => transformFirebaseEvents(data))
        .then(data => ({data, error: ''}))
        .catch(error => handleError<EventInfo[]>(error, [], 'Could not fetch events'));
    return events;
}

export async function fetchEvent(id: string): Promise<{data: EventInfo, error: string}>{
    const event = await fetch(`https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`)
        .then(res => res.json())
        .then((data: FBEvent) => {
            if (data)
                return transformFirebaseEvent(id, data)
            else
                throw ''
        })
        .then(data => ({data, error: ''}))
        .catch(err => handleError(err, {} as EventInfo, 'Could not fetch event'));

    return event;
}

export async function registerEmailSubscription(email: string): Promise<{data: string, error: string}> {
    const res = await fetch('https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events-subscription.json', {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {'Content-Type': 'application/json'}
            })
        .then(res => res.json())
        .then((data: NewFBEntry) => ({data: data.name, error: ''}))
        .catch(error => handleError(error, '', 'Could not register email subscription'))
    return res;
}

export async function fetchComments(eventId: string): Promise<{data: Comment[], error: string}> {
    const res = await fetch(`https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events-comments/${eventId}.json`)
        .then(res => res.json())
        .then((data: {[id: string]: FBComment}) => ({data: transformFirebaseComments(data), error: ''}))
        .catch(error => handleError<Comment[]>(error, [], 'Could not fetch comments'))
    return res;
}

export async function sendComment(comment: FBComment, eventId: string): Promise<{data: Comment, error: string}> {
    const res = await fetch(`https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events-comments/${eventId}.json`, {
        method: 'POST', 
        body: JSON.stringify(comment),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then((data: NewFBEntry) => ({data: {id: data.name, ...comment} as Comment, error: ''}))
    .catch(error => handleError(error, {} as Comment, 'Could not submit your comment'))

    return res;
}

function transformFirebaseEvents(fbEvents: FBEvents) {
    return Object.entries(fbEvents).map(([id, info]) => ({
        id, 
        title: info.title,
        description: info.description,
        address: info.address,
        date: info.date,
        featured: info.featured,
        image: info.image
    } as EventInfo))
}

function transformFirebaseEvent(id: string, info: FBEvent) {
    return {
        id,
        image: info.image,
        title: info.title,
        description: info.description,
        address: info.address,
        date: info.date,
        featured: info.featured
    } as EventInfo
}

function transformFirebaseComments(comments: {[id: string]: FBComment} | null) {
    return comments ? Object.entries(comments).map(([id, info]) => ({id, ...info} as Comment)) : [] as Comment[]
}

function handleError<T>(error: Error, defaultData: T, errorText: string) {
    console.log(error);
    return {data: defaultData, error: errorText}
}