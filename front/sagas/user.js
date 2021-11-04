import { all, fork, takeLatest, put, call } from '@redux-saga/core/effects';
import axios from 'axios';
import { 
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, 
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS 
} from "../reducers/user";



function loadMyInfoAPI() {
    return axios.get('/user')
}

function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI)
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            data: error.response,
        })
    }
}


function logInAPI(data) {
    return axios.post('/user/login', data)
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        yield put({
            type: LOG_IN_FAILURE,
            data: error.response.data,
        })
    }
}

function logOutAPI() {
    return axios.post('/user/logout')
}

function* logOut() {
    try {
        yield call(logOutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (error) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: error.response.data,
        })
    }
}


function signUpAPI(data) {
    return axios.post('/user', data)
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (error) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: error.response.data,
        })
    }
}


function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', {nickname: data})
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            data: error.response.data,
        })
    }
}


function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSingUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}




export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSingUp),
        fork(watchChangeNickname),
    ])
}