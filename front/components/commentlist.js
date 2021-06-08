import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentZone from '../style/comment.module.scss';


const CommentList = ({comment}) => {
    const [ like, setLike ] = useState('favorite_border')
    const { me } = useSelector((state) => state.user);
    

    const onLikeClick = useCallback(()=>{
        if(!(me && me.password)){
            window.alert('로그인이 필요합니다.')
        }else {
            setLike('favorite')
        }
    },[])

    return(
    <li>
        <span className={CommentZone.commentsname}>{comment.User.nickname}</span>
        <span className={CommentZone.commentscon}>{comment.content}</span>
        <span onClick={onLikeClick} className={`material-icons ${CommentZone.likey}`}>{`${like}`}</span>
    </li>        
    );}

export default CommentList;