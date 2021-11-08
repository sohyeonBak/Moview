import { useRouter } from 'next/router';
import React from 'react';
import { END } from '@redux-saga/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AppLayout from '../../components/AppLayout';
import ReviewCard from '../../components/reviewcard';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_CARD_REQUEST } from '../../reducers/card';
import wrapper from '../../store/configureStore';



const Card = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singleCard } = useSelector((state)=> state.card);
  
  return(
      <AppLayout>
        <ReviewCard card={singleCard} />
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
  });
  context.store.dispatch({
    type: LOAD_CARD_REQUEST,
    data: context.params.id,
});
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Card;