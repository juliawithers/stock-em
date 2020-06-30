import React from 'react';
import { configure } from 'enzyme';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
configure({ adapter: new Adapter() });

describe(`Filter component`, () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Filter options={['company','sku','description','date_entered']} data={'orders'}/>
            </BrowserRouter>
            ,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    })
})  