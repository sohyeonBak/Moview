import React, { useEffect, useState } from 'react';
import { END } from '@redux-saga/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import ReviewCard from '../components/reviewcard';
import { LOAD_CARDS_REQUEST } from '../reducers/card';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import '../style/card.module.scss';


const Home = () => {
    const [loginModal, setLoginModal] = useState(false);
    const { mainCards, hasMoreCards, loadCardsLoading } = useSelector((state) => state.card);
    
    const dispatch=useDispatch();

    useEffect(()=>{
        function onScroll() {
          if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            if(hasMoreCards && !loadCardsLoading) {
              const lastId = mainCards[mainCards.length - 1]?.id;
              dispatch({
                type: LOAD_CARDS_REQUEST,
                lastId,
              })
            }
          }
        }
        window.addEventListener('scroll', onScroll);
        return () =>{
          window.removeEventListener('scroll', onScroll)
        }
      },[hasMoreCards, loadCardsLoading, mainCards])
    

    return(
        <AppLayout loginModal={loginModal} setLoginModal={setLoginModal}>
            {mainCards.map(card=><ReviewCard key={card.id} card={card} setLoginModal={setLoginModal}/>)}
        </AppLayout>
    )
  
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_CARDS_REQUEST,
  })
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise();
}) 



export default Home;