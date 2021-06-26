import { all, fork, takeLatest, put, call } from "@redux-saga/core/effects";
import axios from "axios";
import { 
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    AGREE_CARD_FAILURE, AGREE_CARD_REQUEST, AGREE_CARD_SUCCESS, 
    REMOVE_AGREE_CARD_REQUEST, REMOVE_AGREE_CARD_SUCCESS, REMOVE_AGREE_CARD_FAILURE,
    DISAGREE_CARD_FAILURE, DISAGREE_CARD_REQUEST, DISAGREE_CARD_SUCCESS, 
    REMOVE_DISAGREE_CARD_REQUEST, REMOVE_DISAGREE_CARD_SUCCESS, REMOVE_DISAGREE_CARD_FAILURE, 
    LOAD_CARDS_SUCCESS, LOAD_CARDS_FAILURE, LOAD_CARDS_REQUEST, 
    ADD_CARD_SUCCESS, ADD_CARD_FAILURE, ADD_CARD_REQUEST, 
    REMOVE_CARD_REQUEST, REMOVE_CARD_SUCCESS, REMOVE_CARD_FAILURE, 
    LOAD_CARD_REQUEST, LOAD_CARD_SUCCESS, LOAD_CARD_FAILURE, 
    UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
} from "../reducers/card";
import { ADD_CARD_TO_ME, REMOVE_CARD_TO_ME } from "../reducers/user";



function loadCardAPI(data) {
    return axios.get(`/card/${data}`)
}

function* loadCard(action) {
    try{
        const result = yield call(loadCardAPI, action.data);
        console.log(action.data)
        yield put({
            type: LOAD_CARD_SUCCESS,
            data: result.data,
        })
    } catch(error){
        yield put({
            type: LOAD_CARD_FAILURE,
            data: error.response.data,
        })
    }
}


function loadCardsAPI(lastId) {
    return axios.get(`/cards?lastId=${lastId || 0}`)
}

function* loadCards(action) {
    try{
        const result = yield call(loadCardsAPI, action.lastId);
        yield put({
            type: LOAD_CARDS_SUCCESS,
            data: result.data,
        })
    } catch(error){
        yield put({
            type: LOAD_CARDS_FAILURE,
            data: error.response.data,
        })
    }
}


function addCardAPI(data) {
    return axios.post('/card', data)
}

function* addCard(action) {
    try {
        const result = yield call(addCardAPI, action.data);
        console.log(action.data)
        yield put({
            type: ADD_CARD_SUCCESS,
            data: result.data
        })
        yield put({
            type: ADD_CARD_TO_ME,
            data: result.data.id
        })
    } catch (error) {
        yield put({
            type: ADD_CARD_FAILURE,
            data: error.response.data,
        })
    }
}

function removeCardAPI(data) {
    return axios.delete(`/card/${data}`)
}

function* removeCard(action) {
    try {
        const result = yield call(removeCardAPI, action.data);
        console.log(action.data)
        yield put({
            type: REMOVE_CARD_SUCCESS,
            data: result.data
        })
        yield put({
            type: REMOVE_CARD_TO_ME,
            data: result.data.id
        })
    } catch (error) {
        yield put({
            type: REMOVE_CARD_FAILURE,
            data: error.response.data,
        })
    }
}


function addCommentAPI(data) {
    return axios.post(`/card/${data.cardId}/comment`, data)
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        console.log(result)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: error.response.data,
        })
    }
}


function agreeCardAPI(data) {
    return axios.patch(`/card/${data.cardId}/agree`, data)
}

function* agreeCard(action) {
    try {
        const result = yield call(agreeCardAPI, action.data);
        console.log(result)
        yield put({
            type: AGREE_CARD_SUCCESS,
            data: result.data
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: AGREE_CARD_FAILURE,
            data: error.response.data,
        })
    }
}


function removeAgreeCardAPI(data) {
    return axios.delete(`/card/${data.cardId}/agree`, data)
}

function* removeAgreeCard(action) {
    try {
        const result = yield call(removeAgreeCardAPI, action.data);
        yield put({
            type: REMOVE_AGREE_CARD_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: REMOVE_AGREE_CARD_FAILURE,
            data: error.response.data,
        })
    }
}

function disagreeCardAPI(data) {
    return axios.patch(`/card/${data.cardId}/disagree`, data)
}

function* disagreeCard(action) {
    try {
         const result = yield call(disagreeCardAPI, action.data);
        yield put({
            type: DISAGREE_CARD_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: DISAGREE_CARD_FAILURE,
            data: error.response.data,
        })
    }
}

function removeDisagreeCardAPI(data) {
    return axios.delete(`/card/${data.cardId}/disagree`, data)
}

function* removeDisagreeCard(action) {
    try {
         const result = yield call(removeDisagreeCardAPI, action.data);
        yield put({
            type: REMOVE_DISAGREE_CARD_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: REMOVE_DISAGREE_CARD_FAILURE,
            data: error.response.data,
        })
    }
}


function uploadImageAPI(data) {
    return axios.post('/card/images', data)
}

function* uploadImage(action) {
    try {
         const result = yield call(uploadImageAPI, action.data);
        yield put({
            type: UPLOAD_IMAGE_SUCCESS,
            data: result.data
        })
    } catch (error) {
        yield put({
            type: UPLOAD_IMAGE_FAILURE,
            data: error.response.data,
        })
    }
}







function* watchLoadCard() {
    yield takeLatest(LOAD_CARD_REQUEST, loadCard)
}

function* watchLoadCards() {
    yield takeLatest(LOAD_CARDS_REQUEST, loadCards)
}

function* watchAddCard() {
    yield takeLatest(ADD_CARD_REQUEST, addCard)
}

function* watchRemoveCard() {
    yield takeLatest(REMOVE_CARD_REQUEST, removeCard)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchAgreeCard() {
    yield takeLatest(AGREE_CARD_REQUEST, agreeCard)
}

function* watchRemoveAgreeCard() {
    yield takeLatest(REMOVE_AGREE_CARD_REQUEST, removeAgreeCard)
}

function* watchDisagreeCard() {
    yield takeLatest(DISAGREE_CARD_REQUEST, disagreeCard)
}

function* watchRemoveDisagreeCard() {
    yield takeLatest(REMOVE_DISAGREE_CARD_REQUEST, removeDisagreeCard)
}

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage)
}




export default function* cardSaga() {
    yield all([
        fork(watchLoadCard),
        fork(watchLoadCards),
        fork(watchAddCard),
        fork(watchRemoveCard),
        fork(watchAddComment),
        fork(watchAgreeCard),
        fork(watchRemoveAgreeCard),
        fork(watchDisagreeCard),
        fork(watchRemoveDisagreeCard),
        fork(watchUploadImage),
        
    ])
}