import { Comment, FBComment } from "@/util/types";

export async function sendComment(eventId: string, comment: FBComment) {
    const res: {comment: Comment, error: string} = await fetch(`/api/${eventId}/comments`, {
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: {'Content-Type': 'application/json'}
      })
        .then(res => {
            if (res.ok) return res.json()
            else return res.json().then(err => {
                throw new Error(err.message);
            })
        })
        .catch(error => {
            return {comment: {} as Comment, error: error.message || 'Failed to send comment'}
        })
    return res;
}

export function fetchComments(eventId: string) : Promise<{comments: Comment[], error: string}> {
    return fetch(`/api/${eventId}/comments`)
        .then(res => {
            if (res.ok) return res.json()
            else return res.json().then(error => {
                throw new Error(error.message)
            })
        })
        .catch(error => {
            return {comments: [] as Comment[], error: error.message || 'Failed to fetch comments'}
        })
}