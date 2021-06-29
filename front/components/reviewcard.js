import React, { useCallback, useEffect, useState } from 'react';
import Comment from './comment';
import Card from '../style/card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AGREE_CARD_REQUEST, 
    DISAGREE_CARD_REQUEST, 
    REMOVE_AGREE_CARD_REQUEST, 
    REMOVE_CARD_REQUEST, 
    REMOVE_DISAGREE_CARD_REQUEST } 
from '../reducers/card';
import Stars from './stars';
import moment from 'moment';

moment.locale('ko');


const ReviewCard = ({card}) => {
    const [ comment, setComment ] = useState(false);

    const [ notThumbUp, ThumbUp ] = useState(false);
    const [ notThumbDown, ThumbDown ] = useState(false);
    
    
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        const findLikers = card?.Likers?.map((v)=>v.id===me?.id)
        const findUnLikers = card?.UnLikers?.map((v)=>v.id===me?.id)
        if(findLikers?.includes(true)===true){
            ThumbUp(true);
        }else{
            ThumbUp(false);
        }
        if(findUnLikers?.includes(true)===true){
            ThumbDown(true)
        }else{
            ThumbDown(false)
        }
    },[ThumbUp, ThumbDown])

    const onAgree = useCallback(()=>{
        if(me===null){
            window.alert('로그인이 필요합니다.')
        }else {
            
            dispatch({
                type: AGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
    },[card])
    
    const onDeleteAgree = useCallback(()=>{
        if(me===null){
            window.alert('로그인이 필요합니다.')
        }else {
            dispatch({
                type: REMOVE_AGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
        
    },[card])


    const onDisagree = useCallback(()=>{
        if(me===null){
            window.alert('로그인이 필요합니다.')
        }else {
            dispatch({
                type: DISAGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
    },[card])

    const onDeleteDisagree = useCallback(()=>{
        if(me===null){
            window.alert('로그인이 필요합니다.')
        }else {
            dispatch({
                type: REMOVE_DISAGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
    },[card])

    const onDeleteCard = useCallback(()=>{
        dispatch({
            type: REMOVE_CARD_REQUEST,
            data: card.id
        })
    },[card])

    const onComment = useCallback(()=>{
        setComment((prev)=> !prev);
    },[setComment])

    return(
        <>
            <div className={Card.card}>
                <div className={Card.cardTitle} >
                    <h2>{card?.title}</h2>
                    <p>{card?.User?.nickname}</p>
                </div>
                <div className={Card.cardImage}>
                    <img src={`${card?.Images[0]?.src || '' }`} alt={card?.Images[0]?.src || ''} />
                </div>
                <div className={Card.cardReaction} >
                    <div className={Card.like} >
                        {notThumbUp
                            ? <span onClick={onDeleteAgree} className="material-icons">thumb_up</span>
                            : <span onClick={onAgree} className="material-icons">thumb_up_off_alt</span>
                        }
                        <em>{card?.Likers?.length}</em>
                        {notThumbDown
                            ? <span onClick={onDeleteDisagree} className="material-icons">thumb_down</span>
                            : <span onClick={onDisagree} className="material-icons">thumb_down_off_alt</span>
                        }
                        <em>{card?.UnLikers?.length}</em>
                    </div>
                    <div className={Card.comment}>
                        <span onClick={onComment} className="material-icons">chat_bubble_outline</span>
                        {me?.id === card?.User.id
                        ? (<>
                            <span className="material-icons">edit</span>
                            <span onClick={onDeleteCard} className="material-icons">remove_circle_outline</span>
                        </>)
                        : ''
                        }
                    </div>
                </div>
                <div className={Card.reviewconent}>
                    <div className={Card.star}>
                        {[1, 2, 3, 4, 5]?.map((inx)=> {
                            return (
                                <Stars index={inx} card={card}/>
                            )
                        })}
                    </div>
                    <p>{card?.content}</p>
                    <em>{moment(card?.createdAt).format('YYYY.MM.DD')}</em>
                </div>
            </div>
            {comment&&<Comment card={card} />}
        </>
    );}

export default ReviewCard;