import React, { Component } from 'react';
import context from '../context';
import { Table, Thead, Tr, Td, Th } from 'reactable';

export default class CustomerSuppliers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: []
        }
    }

    componentDidMount() {
        this.setState({
            suppliers: this.context.suppliers
        })
    }

    createSupplierTables() {
        return this.context.suppliers.map((lineItem, i) => {
            const { company, contact, phone, email, sup_address } = lineItem;
            return (
                <Tr key={i}>
                    <Td column="Company" value={company}>{company}</Td>
                    <Td column="Supplier Contact Name" value={contact}>{contact}</Td>
                    <Td column="Supplier Contact Phone" value={phone}>{phone}</Td>
                    <Td column="Supplier Contact Email" value={email}>{email}</Td>
                    <Td column="Supplier Contact Address" value={sup_address}>{sup_address}</Td>
                </Tr>
            )
        })
    }

    createSmallSupplierTable = () => {
        return this.context.suppliers.map((lineItem, i) => {
            const { company, contact, phone, email, sup_address } = lineItem;
            return (
                <tr key={i}>
                    <td column="Data">
                        <p value={company}>Company: {company}</p>
                        <p value={contact}>Supplier Contact Name: {contact}</p>
                        <p value={phone} >Supplier Contact Phone: {phone}</p>
                        <p value={email}>Email: {email}</p>
                        <p value={sup_address}> Supplier Address: {sup_address}</p>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Current Suppliers Page</h2>
                <p> Table of current suppliers: </p>
                <div className="table">
                    <p className="sort-text">*Sort by clicking column headers</p>
                    <p className="sort-text-small">*No sort capabilities with condensed table</p>
                    <div className="table-div">
                        <Table className="big-table" itemsPerPage={10} sortable={true} defaultSort={{ column: 'Date Entered', direction: 'desc' }} paginationtype={'simple'}>
                            <Thead>
                                <Th column="Company" className=".rt-th">Company</Th>
                                <Th column="Supplier Contact Name" className=".rt-th">Supplier Contact Name</Th>
                                <Th column="Supplier Contact Phone" className=".rt-th">Supplier Contact Number</Th>
                                <Th column="Supplier Contact Email" className=".rt-th">Supplier Contact Email</Th>
                                <Th column="Supplier Contact Address" className=".rt-th">Supplier Contact Address</Th>
                            </Thead>
                            {this.createSupplierTables()}
                        </Table>

                        <table className="small-tables">
                            <tbody>
                                <tr>
                                    <th>Current Suppliers</th>
                                </tr>
                                {this.createSmallSupplierTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

