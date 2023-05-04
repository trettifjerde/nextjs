import { EventInfo } from "@/util/types";

export const DUMMY_EVENTS: EventInfo[] = [
    {
        id: 'event1',
        title: 'Event 1',
        description: 'Meow',
        featured: true,
        date: new Date('03/25/2023')
    },
    {
        id: 'event2',
        title: 'Second event',
        description: 'Even more meows',
        featured: false,
        date: new Date('04/12/2023')
    }
]