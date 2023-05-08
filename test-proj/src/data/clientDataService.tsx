import { Comment, FBComment } from "@/util/types";

export async function sendComment(eventId: string, comment: FBComment) {
    const res: {comment: Comment, error: string} = await fetch(`/api/${eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: {'Content-Type': 'application/json'}
      })
        .then(res => res.json())
        .catch(error => {
            console.log('Client error while sending comment');
            console.log(error);

            return {comment: {} as Comment, error: 'Could not send comment'}
        })
    return res;
}

export function fetchComments(eventId: string) : Promise<{comments: Comment[], error: string}> {
    return fetch(`/api/${eventId}/comments`)
        .then(res => res.json())
        .catch(error => {
            console.log('Client error while fetching comments');
            console.log(error);

            return {comments: [] as Comment[], error: 'Could not fetch comments'}
        })
}