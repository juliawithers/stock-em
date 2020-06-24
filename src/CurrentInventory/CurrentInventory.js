import React, { Component } from 'react';
import context from '../context';

export default class CurrentInventory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            inventory: []
        }
    }

    componentDidMount(){
        this.setState({
            inventory: this.context.inventory
        })
    }
    // validation code here

    // create table with data
    createInventoryTables() {
        return this.state.inventory.map((lineItem, i) => {
            const { id, sku, quantity, inv_description, inv_location, date_entered} = lineItem;
            return (
                <tr key={id}>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{inv_description}</td>
                    <td>{inv_location}</td>  
                    <td>{date_entered}</td>  
                </tr>    
            )
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Current Inventory Page</h2>
                <p> Table of current Inventory: </p>
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

