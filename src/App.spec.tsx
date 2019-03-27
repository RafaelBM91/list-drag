import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App } from './App';

enzyme.configure({ adapter: new Adapter() });

describe('App Test', () => {
    it('Snapshot', () => {
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });
});
