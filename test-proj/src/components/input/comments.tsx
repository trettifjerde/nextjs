import { useCallback, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { Comment, FBComment } from '@/util/types';
import { fetchComments, sendComment } from '@/data/clientDataService';
import NotificationContext from '@/store/context';

function Comments({eventId}: {eventId: string}) {

  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const {showNotification} = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = useCallback(async (comment: FBComment) => {
    showNotification({title: 'Submitting comment', message: 'Request is in progress', status: 'pending'});

    const res = await sendComment(eventId, comment);

    if (res.error) showNotification({title: 'Error!', message: res.error, status: 'error'})
    else if (res.comment.id) {
      setComments(prev => ([res.comment, ...prev]))
      showNotification({title: 'Added!', message: 'Your comment was successfully added', status: 'success'})
    }
    else showNotification({title: 'Failed to submit comment', message: 'Failed to submit your comment', status: 'error'})

  }, [eventId, showNotification, setComments]);

  useEffect(() => {
    if (eventId) {
      
      fetchComments(eventId)
        .then(res => {
          console.log(res);
          if (res.error) showNotification({title: 'Failed to load comments!', message: res.error, status: 'error'});
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
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;