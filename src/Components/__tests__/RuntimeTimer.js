import React from 'react';
import RuntimeTimer from '../RuntimeTimer';
import { shallow } from 'enzyme';

describe("<RuntimeTimer />", () => {
    it("should render", () => {
        var wrapper = shallow(<RuntimeTimer />);
        expect(wrapper).toBeDefined();
    });
    it("should increment time by defined interval", () => {
        const MOCK_PROPS = { interval: 2000 };
        var wrapper = shallow(<RuntimeTimer {...MOCK_PROPS}  />);
        wrapper.instance().setState({ time: 2000 });
        wrapper.instance().incrementTime();
        expect(wrapper.state().time).toBe(4000);
    });
});