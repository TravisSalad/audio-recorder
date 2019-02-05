import { Database } from '../Firebase';
import { Constants } from '../Services/Constants';

// Fetches recordings from firebase db and returns a list of download urls
export function fetchRecordings() {
    return (dispatch) => {
        Database.read(Constants.paths.recordings, (recordings) => {
            let data = [];
            if (recordings) {
                data = Object.entries(recordings).map(([id, recording]) => ({id, ...recording}));
            }
            dispatch({ type: Constants.FETCH_RECORDINGS_SUCCESS, payload: data });
        });
    }
}

// Saves data in firebase storage and firebase DB.
export function saveRecording(id, file, data = {}) {
    const path = `${Constants.paths.recordings}/${id}`;
    return async (dispatch) => {
        data = await Database.create(path, file, data);
        dispatch({ type: Constants.SAVE_RECORDING_SUCCESS, payload: { id, ...data } });
    }
}

// removes the recording file from firebase storage and removes related data in firebase DB.
export function deleteRecording(id) {
    const path = `${Constants.paths.recordings}/${id}`;
    return async (dispatch) => {
        try {
            await Database.remove(path);
        } catch (err) {
            console.error(err);
        }
        dispatch({ type: Constants.DELETE_RECORDING_SUCCESS, payload: id });
    }
}
