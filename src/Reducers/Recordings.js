import { Constants } from '../Services/Constants';

const defaultState = {
    recordings: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case Constants.FETCH_RECORDINGS_SUCCESS:
            state = { ...state, recordings: action.payload || [] };
            break;
        case Constants.SAVE_RECORDING_SUCCESS:
            state = { ...state, recordings: [ action.payload, ...state.recordings ] }
            break;
        case Constants.DELETE_RECORDING_SUCCESS:
            const recordings = state.recordings.filter(r => r.id !== action.payload);
            state = { ...state, recordings };
            break;
        default:
            break;
    }
    return state;
};