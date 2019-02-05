import React from 'react';
import RecordButton from '../RecordButton';
import { shallow, mount } from 'enzyme';

describe("<RecordButton />", () => {
    it("should render", () => {
        var wrapper = shallow(<RecordButton />);
        expect(wrapper).toBeDefined();
    });
    it("should have recording classname if this.props.isRecording === true", () => {
        var wrapper = mount(<RecordButton isRecording={true} />);
        expect(wrapper.find('.button__record').hasClass('recording')).toBe(true);
    });
});