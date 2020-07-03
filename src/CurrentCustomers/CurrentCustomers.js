import React, { Component } from 'react';
import context from '../context';
import { Table, Thead, Tr, Td, Th } from 'reactable';

export default class CurrentCustomers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }
    componentDidMount() {
        this.setState({
            customers: this.context.customers
        })
    }

    createCustomerTables() {
        return this.context.customers.map((lineItem, i) => {
            const { company, contact, phone, email, bill_address, ship_address } = lineItem;
            return (
                <Tr key={i}>
                    <Td column="Company" className=".rt-th">{company}</Td>
                    <Td column="Customer Contact Name" value={contact}>{contact}</Td>
                    <Td column="Customer Contact Number" value={phone}>{phone}</Td>
                    <Td column="Customer Contact Email" value={email}>{email}</Td>
                    <Td column="Customer Billing Address" value={bill_address}>{bill_address}</Td>
                    <Td column="Customer Shipping Address" value={ship_address}>{ship_address}</Td>
                </Tr>
            )
        })
    }

    createSmallCustomerTable() {
        return this.context.customers.map((lineItem, i) => {
            const { company, contact, phone, email, bill_address, ship_address } = lineItem;
            return (
                <tr key={i}>
                    <td column="Data">
                        <p className=".rt-th">Company: {company}</p>
                        <p value={contact}>Customer Contact Name: {contact}</p>
                        <p value={phone}>Customer Contact Number: {phone}</p>
                        <p value={email}>Customer Contact Email: {email}</p>
                        <p value={bill_address}>Customer Billing Address: {bill_address}</p>
                        <p value={ship_address}>Customer Shipping Address: {ship_address}</p>
                    </td>

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
                    <p className="sort-text">*Sort by clicking column headers</p>
                    <p className="sort-text-small">*No sort capabilities with condensed table</p>
                    <div className="table-div">
                        <Table className="big-table" itemsPerPage={10} sortable={true} defaultSort={{ column: 'Date Entered', direction: 'desc' }} paginationtype={'simple'}>
                            <Thead className=".rt-head">
                                <Th column="Company" className=".rt-th">Company</Th>
                                <Th column="Customer Contact Name" className=".rt-th">Customer Contact Name</Th>
                                <Th column="Customer Contact Number" className=".rt-th">Customer Contact Number</Th>
                                <Th column="Customer Contact Email" className=".rt-th">Customer Contact Email</Th>
                                <Th column="Customer Billing Address" className=".rt-th">Customer Billing Address</Th>
                                <Th column="Customer Shipping Address" className=".rt-th">Customer Ship-to Address</Th>
                            </Thead>
                            {this.createCustomerTables()}
                        </Table>
                        <table className="small-tables">
                            <tbody>
                                <tr>
                                    <th>Current Customers</th>
                                </tr>
                                {this.createSmallCustomerTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}