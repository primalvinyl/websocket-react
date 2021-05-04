import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, SET_USERNAME} from './actions';

const initialState = {
    room: null,
    chatLog: [],
    username: null
}

export default function chatReducer(state, action) {
    switch(action.type){
        case CREATE_ROOM_SUCCESS:
            state.room = action.payload;
            break;
        case JOIN_ROOM_SUCCESS:
            state.room = action.payload;
            break;
        case SET_USERNAME:
            state.username = action.username;
            break;
        default:
            state = initialState;
    
    }
    return state
}
