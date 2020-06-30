import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import context from '../context';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';

class CurrentInventory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
        }
        this.createInventoryTables = this.createInventoryTables.bind(this)
    }

    componentDidMount() {
        this.setState({
            inventory: this.context.inventory,
            sortInv: this.context.inventory
        })
    }

    createInventoryTables=()=> {
        return this.state.inventory.map((lineItem, i) => {
            const { id, sku, quantity, inv_description, inv_location, date_entered } = lineItem;

            let dateArr = date_entered.split('-');
            let date = [];
            date.push(dateArr[0])
            if (dateArr[1].length === 1) {
                date.push('0' + dateArr[1]);
            } else {
                date.push(dateArr[1])
            }
            if (dateArr[2].length === 1) {
                date.push('0' + dateArr[2]);
            }else {
                date.push(dateArr[2])
            }
            let fullDate = date.join('-');

            return (
                <tr key={id}>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{inv_description}</td>
                    <td>{inv_location}</td>
                    <td>{fullDate}</td>
                </tr>
            )
        })
    }

    updateInventory=(inventory)=>{
        this.setState({
            inventory: inventory
        })
        this.updateDataToSort(inventory)
    }

    clearFilter = () => {
        this.setState({
            inventory: this.context.inventory,
            sortInv: this.context.inventory
        })
        
    }

    clearSort = () => {
        this.setState({
            inventory: this.context.inventory,
            sortInv: this.context.inventory
        })
    }

    updateDataToSort=(data)=>{
        this.setState({
            sortInv: data
        })
    }

    render() {

        return (
            <div className="component-div">
                <h2>Current Inventory Page</h2>
                <p> Table of current Inventory: </p>
                <div className="options">
                    <Filter options={['sku','description','location']} data={'inventory'} handleUpdateInventory={this.updateInventory} handleClearFilter={this.clearFilter}/>
                    <Sort data={this.state.sortInv} ident='inventory' handleUpdateFunction={this.updateInventory} handleClearSort={this.clearSort}/>
                </div>
                <div className="table">
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date Received (ymd)</th>
                            </tr>
                            {this.createInventoryTables()}
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(CurrentInventory);