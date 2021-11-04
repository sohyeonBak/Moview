import produce from '../util/produce';


export const initialState = {
 mainCards : [],
 singleCard: null,
 imagePaths : [],
 hasMoreCards: true,
 loadCardLoading: false,
 loadCardDone: false,
 loadCardError: null,
 loadCardsLoading: false,
 loadCardsDone: false,
 loadCardsError: null,
 addCardLoading: false,
 addCardDone: false,
 addCardError: null,
 removeCardLoading: false,
 removeCardDone: false,
 removeCardError: null,
 addCommentLoading: false,
 addCommentDone: false,
 addCommentError: null,
 agreeCardLoading: false,
 agreeCardDone: false,
 agreeCardError: null,
 removeAgreeCardLoading: false,
 removeAgreeCardDone: false,
 removeAgreeCardError: null,
 disagreeCardLoading: false,
 disagreeCardDone: false,
 disagreeCardError: null,
 removeDisagreeCardLoading: false,
 removeDisagreeCardDone: false,
 removeDisagreeCardError: null,
 uploadImageLoading: false,
 uploadImageDone: false,
 uploadImageError: null,
 
}

export const LOAD_CARD_REQUEST = 'LOAD_CARD_REQUEST';
export const LOAD_CARD_SUCCESS = 'LOAD_CARD_SUCCESS';
export const LOAD_CARD_FAILURE = 'LOAD_CARD_FAILURE';

export const LOAD_CARDS_REQUEST = 'LOAD_CARDS_REQUEST';
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS';
export const LOAD_CARDS_FAILURE = 'LOAD_CARDS_FAILURE';

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

export const REMOVE_CARD_REQUEST = 'REMOVE_CARD_REQUEST';
export const REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS';
export const REMOVE_CARD_FAILURE = 'REMOVE_CARD_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const AGREE_CARD_REQUEST = 'AGREE_CARD_REQUEST';
export const AGREE_CARD_SUCCESS = 'AGREE_CARD_SUCCESS';
export const AGREE_CARD_FAILURE = 'AGREE_CARD_FAILURE';

export const REMOVE_AGREE_CARD_REQUEST = 'REMOVE_AGREE_CARD_REQUEST';
export const REMOVE_AGREE_CARD_SUCCESS = 'REMOVE_AGREE_CARD_SUCCESS';
export const REMOVE_AGREE_CARD_FAILURE = 'REMOVE_AGREE_CARD_FAILURE';

export const DISAGREE_CARD_REQUEST = 'DISAGREE_CARD_REQUEST';
export const DISAGREE_CARD_SUCCESS = 'DISAGREE_CARD_SUCCESS';
export const DISAGREE_CARD_FAILURE = 'DISAGREE_CARD_FAILURE';

export const REMOVE_DISAGREE_CARD_REQUEST = 'REMOVE_DISAGREE_CARD_REQUEST';
export const REMOVE_DISAGREE_CARD_SUCCESS = 'REMOVE_DISAGREE_CARD_SUCCESS';
export const REMOVE_DISAGREE_CARD_FAILURE = 'REMOVE_DISAGREE_CARD_FAILURE';

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) { 
        case LOAD_CARD_REQUEST:
            draft.loadCardLoading = true;
            draft.loadCardDone = false;
            draft.loadCardError = null;
        break;
        case LOAD_CARD_SUCCESS:
            draft.loadCardLoading = false;
            draft.loadCardDone = true;
            draft.singleCard = action.data;
        break;
        case LOAD_CARD_FAILURE:
            draft.loadCardLoading = false;
            draft.loadCardError = action.error;
        break;
        case LOAD_CARDS_REQUEST:
            draft.loadCardsLoading = true;
            draft.loadCardsDone = false;
            draft.loadCardsError = null;
        break;
        case LOAD_CARDS_SUCCESS:
            draft.loadCardsLoading = false;
            draft.loadCardsDone = true;
            draft.mainCards = draft.mainCards.concat(action.data);
            draft.hasMoreCards = action.data.length === 10;
        break;
        case LOAD_CARDS_FAILURE:
            draft.loadCardsLoading = false;
            draft.loadCardsError = action.error;
        break;
        case ADD_CARD_REQUEST:
            draft.addCardLoading = true;
            draft.addCardDone = false;
            draft.addCardError = null;
        break;
        case ADD_CARD_SUCCESS:
            draft.addCardLoading = false;
            draft.addCardDone = true;
            draft.mainCards.unshift(action.data);
        break;
        case ADD_CARD_FAILURE:
            draft.addCardLoading = false;
            draft.addCardError = action.error;
        break;
        case REMOVE_CARD_REQUEST:
            draft.removeCardLoading = true;
            draft.removeCardDone = false;
            draft.removeCardError = null;
        break;
        case REMOVE_CARD_SUCCESS:
            draft.removeCardLoading = false;
            draft.removeCardDone = true;
            draft.mainCards=draft.mainCards.filter((v)=>v.id !==action.data.CardId);
        break;
        case REMOVE_CARD_FAILURE:
            draft.removeCardLoading = false;
            draft.removeCardError = action.error;
        break;
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
        break;
        case ADD_COMMENT_SUCCESS:{
            const commentCard = draft.mainCards.find((v)=> v.id === action.data.CardId)
            commentCard.Comments.unshift(action.data)
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
        }
        break;
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
        break;
        case AGREE_CARD_REQUEST:
            draft.agreeCardLoading = true;
            draft.agreeCardDone = false;
            draft.agreeCardError = null;
        break;
        case AGREE_CARD_SUCCESS:{
            const card = draft.mainCards.find((v)=> v.id === action.data.CardId);
            if(card){
                card.Likers.push(action.data.UserId)
            }
            draft.agreeCardLoading = false;
            draft.agreeCardDone = true;
        }
        break;
        case AGREE_CARD_FAILURE:
            draft.agreeCardLoading = false;
            draft.agreeCardError = action.error;
        break;
        case REMOVE_AGREE_CARD_REQUEST:
            draft.removeAgreeCardLoading = true;
            draft.removeAgreeCardDone = false;
            draft.removeAgreeCardError = null;
        break;
        case REMOVE_AGREE_CARD_SUCCESS:{
            const card = draft.mainCards.find((v)=> v.id === action.data.CardId);
            card.Likers = card.Likers.filter((v)=> v.id !== action.data.UserId)
            draft.removeAgreeCardLoading = false;
            draft.removeAgreeCardDone = true;
        }
        break;
        case REMOVE_AGREE_CARD_FAILURE:
            draft.removeAgreeCardLoading = false;
            draft.removeAgreeCardError = action.error;
        break;
        case DISAGREE_CARD_REQUEST:
            draft.disagreeCardLoading = true;
            draft.disagreeCardDone = false;
            draft.disagreeCardError = null;
        break;
        case DISAGREE_CARD_SUCCESS:{
            const cards = draft.mainCards.find((v)=> v.id === action.data.CardId);
            if(cards){
                cards.UnLikers.push(action.data.UserId)
            }
            draft.disagreeCardLoading = false;
            draft.disagreeCardDone = true;
        }
        break;
        case DISAGREE_CARD_FAILURE:
            draft.disagreeCardLoading = false;
            draft.disagreeCardError = action.error;
        break;
        case REMOVE_DISAGREE_CARD_REQUEST:
            draft.disagreeCardLoading = true;
            draft.disagreeCardDone = false;
            draft.disagreeCardError = null;
        break;
        case REMOVE_DISAGREE_CARD_SUCCESS:{
            const cards = draft.mainCards.find((v)=> v.id === action.data.CardId);
            cards.UnLikers = cards.UnLikers.filter((v)=> v.id !== action.data.UserId);
            draft.disagreeCardLoading = false;
            draft.disagreeCardDone = true;
        }
        break;
        case REMOVE_DISAGREE_CARD_FAILURE:
            draft.disagreeCardLoading = false;
            draft.disagreeCardError = action.error;
        break;
        case UPLOAD_IMAGE_REQUEST:
            draft.uploadImageLoading = true;
            draft.uploadImageDone = false;
            draft.uploadImageError = null;
        break;
        case UPLOAD_IMAGE_SUCCESS: {
            draft.imagePaths = action.data;
            draft.uploadImageLoading = false;
            draft.uploadImageDone = true;
        }
        break;
        case UPLOAD_IMAGE_FAILURE:
            draft.uploadImageLoading = false;
            draft.uploadImageError = action.error;
        break;
        case REMOVE_IMAGE:
            draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
        default:
            break;
    }
})

export default reducer;