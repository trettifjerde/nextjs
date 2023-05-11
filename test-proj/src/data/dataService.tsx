import { Comment, EventInfo, FBComment, FBEvent, FBEvents } from "@/util/types";

export async function fetchEvents() : Promise<{data: EventInfo[], error: string}>{
    const events = await fetch('https://academind34-default-rtdb.europe-west1.firebasedatabase.app/events.json')
        .then(res => res.json())
        .then((data: FBEvents) => transformFirebaseEvents(data))
        .then(data => ({data, error: ''}))
        .catch(error => handleError<EventInfo[]>(error, [], 'Could not fetch events'));
    return events;
}

export async function fetchEvent(id: string): Promise<{event: EventInfo, error: string}>{
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

    return {
        event: event.data,
        error: event.error,
    };
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

function handleError<T>(error: Error, defaultData: T, errorText: string) {
    console.log(error);
    return {data: defaultData, error: errorText}
}