import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />); 
    });

    it('should have the `th` "items"', () => {
        expect(wrapper.contains(<th>Items</th>)).toBe(true);
    });

    it('should have a `button` element', () => {
        expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(true); 
    });

    it('`button` should be disabled', () => {
        const button = wrapper.find('button').first();
        expect(button.props().disabled).toBe(true);
    });

    it('should have an `input` element', () => {
        expect(wrapper.containsMatchingElement(<input/>)).toBe(true); 
    });
});

