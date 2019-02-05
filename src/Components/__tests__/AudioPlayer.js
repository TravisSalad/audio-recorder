import React from 'react';
import AudioPlayer from '../AudioPlayer';
import Button from '../Button';
import { shallow, mount } from 'enzyme';

describe("<AudioPlayer />", () => {
    it("should render", () => {
        const props = { recording: { downloadURL: "" } };
        var wrapper = shallow(<AudioPlayer { ...props } />);
        expect(wrapper).toBeDefined();
    });
    it("should call this.props.deleteRecording with recording id when delete button is clicked", () => {
        const deleteRecording = jest.fn();
        const id = '123'
        const props = { recording: { downloadURL: "", id }, deleteRecording };
        var wrapper = mount(<AudioPlayer { ...props } />);
        expect(deleteRecording).toHaveBeenCalledTimes(0);
        wrapper.find(Button).simulate('click');
        expect(deleteRecording).toHaveBeenCalledTimes(1);
        expect(deleteRecording).toHaveBeenCalledWith(id);
    });
});