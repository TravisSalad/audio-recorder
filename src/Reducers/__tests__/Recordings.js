import Recordings from '../Recordings';
import { Constants } from '../../Services/Constants';

describe('Recordings', () => {
    it('should have correct initial state', () => {
        const action = { type: 'dummy_action' };
        const initialState = { recordings: [] };
        expect(Recordings(undefined, action)).toEqual(initialState);
    });
    it('should add recordings to state on FETCH_RECORDINGS_SUCCESS', () => {
        const payload = [
            { id: '123', downloadURL: '123' },
            { id: '456', downloadURL: '456' },
        ];
        const action = { type: Constants.FETCH_RECORDINGS_SUCCESS, payload };
        const state = { recordings: payload };
        expect(Recordings(undefined, action)).toEqual(state);
    });
    it('should add new recording to state on SAVE_RECORDING_SUCCESS', () => {
        const recordings = [
            { id: '123', downloadURL: '123' },
            { id: '456', downloadURL: '456' },
        ];
        const payload = { id: '789', downloadURL: '789' };
        const action = { type: Constants.SAVE_RECORDING_SUCCESS, payload };
        const expectedState = { recordings: [ payload, ...recordings ] };
        expect(Recordings({recordings}, action)).toEqual(expectedState);
    });
    it('should remove recording from state on DELETE_RECORDING_SUCCESS', () => {
        const recordings = [
            { id: '123', downloadURL: '123' },
            { id: '456', downloadURL: '456' },
        ];
        const payload = '123';
        const action = { type: Constants.DELETE_RECORDING_SUCCESS, payload };
        const expectedState = { recordings: recordings.filter(r => r.id !== payload) };
        expect(Recordings({recordings}, action)).toEqual(expectedState);
    });
})