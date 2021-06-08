import { all, fork } from '@redux-saga/core/effects';
import userSaga from './user';
import cardSaga from './card';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065'
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(cardSaga)
    ]);
}