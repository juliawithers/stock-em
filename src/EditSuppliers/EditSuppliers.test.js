import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import EditSuppliers from './EditSuppliers';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe(`EditSuppliers component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <EditSuppliers />
            </BrowserRouter>
            ,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
}) 