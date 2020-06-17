import React from 'react';
import context from './context';

export default class OrderHistory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: this.context.suppliers.supplier_data
        }
    }
    // validation code here

    // create table with data
    createSupplierTables() {
        return this.state.suppliers.map((lineItem, i) => {
            const { company, contact, phone, email, address } = lineItem;
            return (
                <tr>
                    <td>{company}</td>
                    <td>{contact}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Current Suppliers Page</h1>
                <p> table of current inventory </p>
                <div class="table">
                    <table class="scrolling-wrapper">
                        <tr>
                            <th>Company</th>
                            <th>Supplier Contact Name</th>
                            <th>Supplier Contact Number</th>
                            <th>Supplier Contact Email</th>
                            <th>Supplier Contact Address</th>
                        </tr>
                        {this.createSupplierTables()}
                    </table>
                </div>
            </div>
        )
    }
}

