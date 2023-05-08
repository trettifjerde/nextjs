import { useCallback, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment, FBComment } from '@/util/types';
import ErrorAlert from '../ui/error-alert';
import { fetchComments, sendComment } from '@/data/clientDataService';

function Comments({eventId}: {eventId: string}) {

  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState('');

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = useCallback(async (comment: FBComment) => {
    const res = await sendComment(eventId, comment);

    if (res.error) 
      setError(error);
    else if (res.comment.id) 
      setComments(prev => ([res.comment, ...prev]))

  }, [eventId, setError, setComments]);

  useEffect(() => {
    if (eventId) {
      fetchComments(eventId)
        .then(res => {
          if (res.error) setError(res.error);
          else setComments(res.comments);
        })
    }
  }, []);

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;