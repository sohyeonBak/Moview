import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/card';
import CommentZone from '../style/comment.module.scss';


const CommentForm = ({card, setLoginModal}) => {
    const [ comment, setComment ] = useState('')
    const {me} = useSelector((state) => state.user);
    const dispatch = useDispatch()
    
    const onCommentChange = useCallback((e)=>{
        setComment(e.target.value)
    },[])


    const onCommentSubmit = useCallback(()=>{
        if(!me){
            setLoginModal(true)
        }else {
            setComment('');
            dispatch({
                type: ADD_COMMENT_REQUEST,
                data: { content: comment, cardId : card.id, User: { id : me.id, nickname: me.nickname} }
            })
        }
    },[me, card, comment, setLoginModal])

    return(
        <div className={CommentZone.commentedit}>
            <div>
                <input type="text" value={comment} onChange={onCommentChange} />
                <button onClick={onCommentSubmit}>전송</button>
            </div> 
        </div>
               
    );}

export default CommentForm;