import React from 'react';
import { END } from '@redux-saga/core';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import ReviewForm from '../components/reviewform';
import axios from 'axios';
import wrapper from '../store/configureStore';



const EditReview = () => {
    return(
        <AppLayout>
            <ReviewForm />     
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
    context.store.dispatch(END);
    
    await context.store.sagaTask.toPromise();
});

export default EditReview;