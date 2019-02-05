import React from 'react';
import ViewRecord from '../ViewRecord';
import AudioPlayer from '../AudioPlayer';
import RuntimeTimer from '../RuntimeTimer';
import { shallow, mount } from 'enzyme';
import RecordButton from '../RecordButton';

const statusTypes = {
    recording: 'recording',
    loading: 'loading'
}

describe("<ViewRecord />", () => {
    it("should render", () => {
        const MOCK_PROPS = { recordings: [], fetchRecordings: jest.fn() };
        var wrapper = shallow(<ViewRecord { ...MOCK_PROPS } />);
        expect(wrapper).toBeDefined();
    });
    it("should render an audio player for each recording", () => {
        const MOCK_PROPS = {
            recordings: [ { id: '123', downloadURL: '' }, { id: '456', downloadURL: '' } ],
            fetchRecordings: jest.fn()
        };
        var wrapper = shallow(<ViewRecord { ...MOCK_PROPS } />);
        expect(wrapper.find(AudioPlayer)).toHaveLength(2);
    });
    it("should render proper recording state based on state.status", () => {
        const MOCK_PROPS = {
            recordings: [],
            fetchRecordings: jest.fn()
        };
        var wrapper = shallow(<ViewRecord { ...MOCK_PROPS } />);
        wrapper.instance().setState({ status: statusTypes.recording });
        expect(wrapper.find(RuntimeTimer)).toBeDefined();
        wrapper.instance().setState({ status: statusTypes.loading });
        expect(wrapper.instance().renderStatus()).toEqual("Uploading File...");
    });
});