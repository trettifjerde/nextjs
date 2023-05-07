import { useCallback, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment, FBComment } from '@/util/types';
import { fetchComments, sendComment } from '@/data/dataService';
import ErrorAlert from '../ui/error-alert';

function Comments({eventId}: {eventId: string}) {

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = useCallback(async (comment: FBComment) => {
    const res = await sendComment(comment, eventId);
    if (res.error) 
      setError(res.error)
    else 
      setComments(prev => ([...prev, res.data]))
  }, [setError, setComments]);

  useEffect(() => {
    fetchComments(eventId).then(({data, error}) => {
      setError(error);
      setComments(data);
    })
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