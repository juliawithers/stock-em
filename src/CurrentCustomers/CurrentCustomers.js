import React, { Component }  from 'react';
import context from '../context';

export default class CurrentCustomers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }
    componentDidMount(){
        this.setState({
            customers: this.context.customers
        })
    }

    createSupplierTables() {
        return this.state.customers.map((lineItem, i) => {
            const { company, contact, phone, email, bill_address, ship_address } = lineItem;
            return (
                <tr key={i}>
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
            <div className="component-div">
                <h2>Current Customers Page</h2>
                <p> Table of current customers: </p>
                <div className="table">
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                                <th>Company</th>
                                <th>Customer Contact Name</th>
                                <th>Customer Contact Number</th>
                                <th>Customer Contact Email</th>
                                <th>Customer Billing Address</th>
                                <th>Customer Ship-to Address</th>
                            </tr>
                            {this.createSupplierTables()}    
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}