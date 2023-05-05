import { EventInfo } from "@/util/types";

export const DUMMY_EVENTS: EventInfo[] = [
    {
        id: 'event1',
        title: 'Event 1',
        description: 'Meow',
        featured: true,
        date: new Date('03/25/2023'),
        address: 'Meow St. 14'
    },
    {
        id: 'event2',
        title: 'Second event',
        description: 'Even more meows',
        featured: false,
        date: new Date('04/12/2023'),
        address: 'Meow St. 34'
    }
]

export function getEventById(id: string | string [] | undefined) {
    if (typeof id === 'string') {
        return DUMMY_EVENTS.find(event => event.id === id);
    }
    return undefined;
}

export function getFilteredEvents(year: number, month: number) {
    return DUMMY_EVENTS.filter(event => event.date.getMonth() === month && event.date.getFullYear() === year)
}
