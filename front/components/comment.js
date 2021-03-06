import React from 'react';
import CommentForm from './commentform';
import CommentList from './commentlist';
import CommentZone from '../style/comment.module.scss';



const Comment = ({card, setLoginModal}) => {

    return(
        <div className={CommentZone.Comments} >
            <ul className={CommentZone.commentslist} >
                {card.Comments.map(comment=> <CommentList key={comment.id} comment={comment} />)}
            </ul>
            <CommentForm card={card} setLoginModal={setLoginModal}/>
        </div>    
    );}

export default Comment;