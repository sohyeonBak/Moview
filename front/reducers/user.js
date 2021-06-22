import produce from '../util/produce';

export const initialState ={
    loadMyInfoLoading: false,
    loadMyInfoDone: null,
    loadMyInfoError: false,
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    me: null,
    userInfo: null
}

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const ADD_CARD_TO_ME = 'ADD_CARD_TO_ME';

export const REMOVE_CARD_TO_ME = 'REMOVE_CARD_TO_ME';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';



export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});


export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
    
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_MY_INFO_REQUEST:
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoDone = false;
            draft.loadMyInfoError = null;
				break;
        case LOAD_MY_INFO_SUCCESS:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = true;
            draft.me = action.data;
				break;
        case LOAD_MY_INFO_FAILURE:
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
				break;
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = null;
				break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.me = action.data;
				break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
				break;
        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
				break;
		case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.me = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
			break;
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpDone = false;
            draft.signUpError = null;
                break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case ADD_CARD_TO_ME:
            draft.me.Cards.unshift({id: action.data});
            break;
        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true;
            draft.changeNicknameDone = false;
            draft.changeNicknameError = null;
                break;
        case CHANGE_NICKNAME_SUCCESS:
            draft.me.nickname = action.data.nickname;
            draft.changeNicknameLoading = false;
            draft.changeNicknameDone = true;
            break;
        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false;
            draft.changeNicknameError = action.error;
            break;
        default:
            break;
    }
}) 

export default reducer;