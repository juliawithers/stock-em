import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import CustomerOrder from './CustomerOrder';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe(`CustomerOrder component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <CustomerOrder />
            </BrowserRouter>
            ,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
}) 