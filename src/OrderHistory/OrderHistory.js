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
            const { company, sku, quantity, description, cust_order, sup_order, date_entered } = lineItem;

            let dateArr = date_entered.split('-');
            let date=[];
            date.push(dateArr[0])
            if(dateArr[1].length === 1) {
                date.push('0'+dateArr[1]) ;
            }
            if(dateArr[2].length === 1) {
                date.push('0'+dateArr[2]);
            }
            let fullDate = date.join('-');

            return (
                <tr key={i}>
                    <td>{company}</td>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{description}</td>
                    <td>{cust_order}</td>
                    <td>{sup_order}</td>
                    <td>{fullDate}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Order History</h2>
                <p> Table of past orders: </p>
                <div className="table">
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                            <th>Company</th>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Customer PO</th>
                            <th>Supplier PO</th>
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

