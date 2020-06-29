import React, { Component }  from 'react';
import context from '../context';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';

export default class OrderHistory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            past_orders: [],
            sortOrders: []
        }
    }

    componentDidMount(){
        this.setState({
            past_orders: this.context.past_orders,
            sortOrders: this.context.past_orders
        })
    }

    createSupplierTables() {
        return this.state.past_orders.map((lineItem, i) => {
            const { company, sku, quantity, inv_description, cust_order, sup_order, date_entered } = lineItem;

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
                    <td>{inv_description}</td>
                    <td>{cust_order}</td>
                    <td>{sup_order}</td>
                    <td>{fullDate}</td>
                </tr>
            )
        })
    }

    updateOrders=(orders)=>{
        this.setState({
            past_orders: orders
        })
        this.updateDataToSort(orders)
    }

    clearFilter = (past_orders) => {
        this.setState({
            filter_choice: 'Choose one',
            filter_options: 'Choose one',
            filter: '',
            past_orders: past_orders
        })
    }

    clearSort = (past_orders) => {
        this.setState({
            sort_choice: 'Choose one',
            past_orders: past_orders
        })
    }

    updateDataToSort=(data)=>{
        this.setState({
            sortOrders: data
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Order History</h2>
                <p> Table of past orders: </p>
                <div className="options">
                    <Filter options={['company','sku','description','date_entered']} data={'orders'} handleUpdateOrders={this.updateOrders} handleClearFilter={this.clearFilter}/>
                    <Sort data={this.state.sortOrders} ident='orders' handleUpdateFunction={this.updateOrders} handleClearSort={this.clearSort}/>
                </div>
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

