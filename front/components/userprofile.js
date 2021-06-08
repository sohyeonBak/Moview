import React from 'react';
import NameForm from './nameform';
import MyReviewList from './myreviewlist';
import Profile from '../style/profile.module.scss';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { me } =useSelector((state) => state.user);
    return(
        <div className={Profile.profile} >
            <div className={Profile.userinfo} >
                <h3>{me.nickname}</h3>
                <NameForm />
            </div>
            <div className={Profile.userreview}>
                <p>{`${me.nickname} 님의 글 : ${me.Cards.length}`}</p>
                <ul>
                    {me.Cards.map((card)=><MyReviewList card={card} key={card.id} />)}
                </ul>
            </div>
        </div>    
    );}

export default UserProfile;