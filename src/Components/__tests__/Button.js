import React from 'react';
import Button from '../Button';
import { shallow } from 'enzyme';

describe("<Button />", () => {
    it("should render", () => {
        var wrapper = shallow(<Button />);
        expect(wrapper).toBeDefined();
    });
});