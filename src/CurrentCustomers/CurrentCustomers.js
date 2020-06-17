import React from 'react';
import context from './context';

export default class Login extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: this.context.customers.customer_data
        }
    }
    // validation code here

    // create table with data
    createSupplierTables() {
        return this.state.customers.map((lineItem, i) => {
            const { company, contact, phone, email, bill_address, ship_address } = lineItem;
            return (
                <tr>
                    <td>{company}</td>
                    <td>{contact}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>{bill_address}</td>
                    <td>{ship_address}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Current Customers Page</h1>
                <p> table of current inventory </p>
                <div class="table">
                    <table class="scrolling-wrapper">
                        <tr>
                            <th>Company</th>
                            <th>Customer Contact Name</th>
                            <th>Customer Contact Number</th>
                            <th>Customer Contact Email</th>
                            <th>Customer Billing Address</th>
                            <th>Customer Ship-to Address</th>
                        </tr>
                        {this.createSupplierTables()}
                    </table>
                </div>
            </div>
        )
    }
}