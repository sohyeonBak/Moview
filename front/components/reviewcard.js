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
import Router from 'next/router';

moment.locale('ko');


const ReviewCard = ({card}) => {
    const [ comment, setComment ] = useState(false);

    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);

    const { me } = useSelector((state) => state.user);
    const { loadCardsDone, agreeCardDone, disagreeCardDone } = useSelector((state)=> state.card);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(loadCardsDone){
            Router.push('/')
        }
    },[loadCardsDone, agreeCardDone, disagreeCardDone])
    
    const setDisLikeUp = useCallback(() => {
        setDisLike(disLike => !disLike)
    },[])

    const setLikeUp = useCallback(() => {
        setLike(like => !like)
    },[])
    
    const handleDisLike = useCallback(()=>{
        if(like){
            setDisLikeUp()
            setLikeUp()
        }
        setDisLikeUp()
        if(!disLike){
            dispatch({
                type: DISAGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }else{
            dispatch({
                type: REMOVE_DISAGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
    },[like, setLikeUp, setDisLikeUp, card])

    const handleLike = useCallback(()=>{
        if(disLike){
            setLikeUp();
            setDisLikeUp();
        }
        setLikeUp();
        if(!like){
            dispatch({
                type: AGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }else{
            dispatch({
                type: REMOVE_AGREE_CARD_REQUEST,
                data: {cardId: card?.id}
            })
        }
    },[disLike, setLikeUp, setDisLikeUp, card])
    

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
                         <span className={`material-icons ${Card.materialIcons}`} onClick={handleLike}>{me&&card?.Likers?.length > 0?'thumb_up' : 'thumb_up_off_alt'}</span>
                        <em>{card?.Likers?.length}</em>
                        <span className={`material-icons ${Card.materialIcons}`} onClick={handleDisLike}>{me&&card?.UnLikers?.length > 0 ? 'thumb_down' : 'thumb_down_off_alt'}</span>
                        <em>{card?.UnLikers?.length}</em>
                    </div>
                    <div className={Card.comment}>
                        <span onClick={onComment} className={`material-icons ${Card.materialIcons}`}>chat_bubble_outline</span>
                        {me?.id === card?.User.id
                        ? (<>
                            <span onClick={onDeleteCard} className={`material-icons ${Card.materialIcons}`}>remove_circle_outline</span>
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