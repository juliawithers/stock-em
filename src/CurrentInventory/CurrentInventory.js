import React from 'react';
import context from './context';

export default class Login extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            inventory: this.context.inventory.skus
        }
    }
    // validation code here

    // create table with data
    createInventoryTables() {
        return this.state.inventory.map((lineItem, i) => {
            const { sku, quantity, description, location } = lineItem;
            return (
                <tr>
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
                <p> table of current inventory </p>
                <div class="table">
                    <table class="scrolling-wrapper">
                        <tr>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Location</th>
                        </tr>
                        {this.createInventoryTables()}
                    </table>
                </div>
            </div>
        )
    }
}

