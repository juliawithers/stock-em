import React, { Component }  from 'react';
import context from '../context';

export default class OrderHistory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            past_orders: []
        }
    }

    componentDidMount(){
        this.setState({
            past_orders: this.context.past_orders
        })
    }
    // validation code here

    // create table with data
    createSupplierTables() {
        return this.state.past_orders.map((lineItem, i) => {
            const { company, sku, quantity, description, order, date_entered } = lineItem;
            return (
                <tr key={i}>
                    <td>{company}</td>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{description}</td>
                    <td>{order}</td>
                    <td>{date_entered}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Past Orders History</h1>
                <p> table of current inventory </p>
                <div className="table">
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                            <th>Company</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>PO</th>
                            <th>Date Entered</th>
                            </tr>
                            {this.createSupplierTables()}    
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

