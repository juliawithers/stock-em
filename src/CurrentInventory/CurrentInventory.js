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
            const { sku, quantity, description, location } = lineItem;
            return (
                <tr key={i}>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{description}</td>
                    <td>{location}</td>    
                </tr>    
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Current Inventory Page</h1>
                <p> Table of current Inventory: </p>
                <div className="table">        
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Location</th>
                            </tr>
                            {this.createInventoryTables()}    
                        </tbody>
                       
                    </table>
                </div>
            </div>
        )
    }
}

