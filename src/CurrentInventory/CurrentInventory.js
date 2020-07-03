import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Thead, Tr, Td, Th } from 'reactable';
import context from '../context';
import Filter from '../Filter/Filter';

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
            inventory: this.context.inventory
        })
    }

    createInventoryTables = () => {
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
            } else {
                date.push(dateArr[2])
            }
            let fullDate = date.join('-');

            return (
                <Tr key={id}>
                    <Td column="SKU" value={sku}>{sku}</Td>
                    <Td column="Quantity" value={quantity}>{quantity}</Td>
                    <Td column="Description" value={inv_description}>{inv_description}</Td>
                    <Td column="Location" value={inv_location}>{inv_location}</Td>
                    <Td column="Date Received" value={fullDate}>{fullDate}</Td>
                </Tr>
            )
        })
    }

    createSmallInventoryTable = () => {
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
            } else {
                date.push(dateArr[2])
            }
            let fullDate = date.join('-');

            return (
                <tr key={id}>
                    <td>
                        <p value={sku}>SKU: {sku}</p>
                        <p value={quantity}>Quantity: {quantity}</p>
                        <p value={inv_description}>Description: {inv_description}</p>
                        <p value={inv_location}>Location{inv_location}</p>
                        <p value={fullDate}>Date Received: {fullDate}</p>
                    </td>
                </tr>
            )
        })
    }

    updateInventory = (inventory) => {
        this.setState({
            inventory: inventory
        })
    }

    clearFilter = () => {
        this.setState({
            inventory: this.context.inventory
        })

    }

    render() {

        return (
            <div className="component-div">
                <h2>Current Inventory Page</h2>
                <p> Table of current Inventory: </p>
                <div className="options">
                    <Filter options={['sku', 'description', 'location']} data={'inventory'} handleUpdateInventory={this.updateInventory} handleClearFilter={this.clearFilter} />
                </div>
                <div className="table">
                    <p className="sort-text">*Sort by clicking column headers</p>
                    <p className="sort-text-small">*No sort capabilities with condensed table</p>
                    <Table className="big-table" itemsPerPage={10} sortable={true} defaultSort={{ column: 'Date Received', direction: 'desc' }} paginationtype={'simple'}>
                        <Thead className=".rt-head">
                            <Th column="SKU" className=".rt-th">SKU</Th>
                            <Th column="Quantity" className=".rt-th">Quantity</Th>
                            <Th column="Description" className=".rt-th">Description</Th>
                            <Th column="Location" className=".rt-th">Location</Th>
                            <Th column="Date Received" className=".rt-th">Date Received (ymd)</Th>
                        </Thead>
                        {this.createInventoryTables()}
                    </Table>
                    <table className="small-tables">
                        <tbody>
                            <tr>
                                <th>Current Inventory</th>
                            </tr>
                            {this.createSmallInventoryTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default withRouter(CurrentInventory);