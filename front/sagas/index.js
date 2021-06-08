import { all, fork } from '@redux-saga/core/effects';
import userSaga from './user';
import cardSaga from './card';
import axios from 'axios';
import { backURL } from '../config/config';

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(cardSaga)
    ]);
}