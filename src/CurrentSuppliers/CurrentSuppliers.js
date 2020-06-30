import React, { Component }  from 'react';
import context from '../context';

export default class CustomerSuppliers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: []
        }
    }

    componentDidMount(){
        this.setState({
            suppliers: this.context.suppliers
        })
    }
    
    createSupplierTables() {
        return this.context.suppliers.map((lineItem, i) => {
            const { company, contact, phone, email, sup_address } = lineItem;
            return (
                <tr key={i}>
                    <td>{company}</td>
                    <td>{contact}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>{sup_address}</td>
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
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                                <th>Company</th>
                                <th>Supplier Contact Name</th>
                                <th>Supplier Contact Number</th>
                                <th>Supplier Contact Email</th>
                                <th>Supplier Contact Address</th>
                            </tr>
                            {this.createSupplierTables()}    
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

