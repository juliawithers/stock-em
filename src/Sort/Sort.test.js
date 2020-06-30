import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import Sort from './Sort';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe(`Sort component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Sort />
            </BrowserRouter>
            ,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  