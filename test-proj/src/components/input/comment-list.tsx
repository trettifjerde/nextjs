import { Comment } from '@/util/types';
import classes from './comment-list.module.css';

function CommentList({comments}: {comments: Comment[]}) {
  return (
    <>
      {comments.length === 0 && <div className='center'>No comments yet</div>}
      {comments.length > 0 && <ul className={classes.comments}>
        {comments.map(comment => <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>)}
      </ul>}
    </>
  );
}

export default CommentList;