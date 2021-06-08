import React from 'react';
import { END } from '@redux-saga/core';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import UserProfile from '../components/userprofile';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const MyPage = (props) => {
    
    
    return(
        <AppLayout>
            <UserProfile />        
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

export default MyPage;