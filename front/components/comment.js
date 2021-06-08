import React from 'react';
import CommentForm from './commentform';
import CommentList from './commentlist';
import CommentZone from '../style/comment.module.scss';



const Comment = ({card}) => {

    return(
        <div className={CommentZone.comments} >
            <ul className={CommentZone.commentslist} >
                {card.Comments.map(comment=> <CommentList key={comment.id} comment={comment} />)}
            </ul>
            <CommentForm card={card} />
        </div>    
    );}

export default Comment;