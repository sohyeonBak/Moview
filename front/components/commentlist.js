import React from 'react';
import CommentZone from '../style/comment.module.scss';


const CommentList = ({comment}) => {

    return(
    <li>
        <span className={CommentZone.commentsname}>{comment.User.nickname}</span>
        <span className={CommentZone.commentscon}>{comment.content}</span>
    </li>        
    );}

export default CommentList;