import React, { Component } from 'react';
import context from '../context';

export default class CustomerOrder extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            inventory: [],
            sku: '',
            customer: '',
            qty: '',
            order: '',
            description: ''
        }
    }

    componentDidMount(){
        this.setState({
            customers: this.context.customers.customers_data,
            inventory: this.context.inventory.skus,
        })
    }
    // validation code here

    createCustomerOptions=()=> {
        let options = this.state.customers;
        return options.map((item, i) => {
            return (
            <option
            key={i}
            value={item.company}>
                {item.company}
            </option>)
        });
    }

    createSKUOptions=()=> {
        let options = this.state.inventory;
        return options.map((item, i) => {
            return (
            <option
            key={i}
            value={item.sku}>
                {item.sku}
            </option>)
        });
    }

    verifySKUQuantity(options, qty, sku) {
        let sum = 0;
        options.map((item, i) => {
            if (item.sku === sku) {
                sum += item.quantity;
            }
            return `SKU is not in the database`
        })

        if (qty > sum) {
            return `<p>SKU ${sku} quantity: ${qty}, you cannot overdraft from inventory</p>`
        }
        return `<p></p>`;
    }

    submitCustomerPO = e => {
        e.preventDefault();

        this.state.inventory.find(item => {
            if (item.sku === this.state.sku) {
                this.setState({
                    description: item.description
                })
            }
        })

        this.verifySKUQuantity(this.state.inventory, this.state.qty, this.state.sku);
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const customerPOobj = {
            user_id: this.context.user_id,
            company: this.state.customer,
            sku: this.state.sku,
            quantity: this.state.qty,
            description: this.state.description,
            order: this.state.order,
            date_entered: date
        }
        this.context.submitCustomerPO(customerPOobj)
    }

    updateSelections = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'customer-options') {
            this.setState({
                customer: value
            });
        }
        if (id === 'sku') {
            this.setState({
                sku: value
            });
        }
        if (id === 'quantity') {
            if (value === '') {
                this.setState({
                    qty: 0,
                    message: 'You must enter a quantity'
                });
            } else {
                this.setState({
                    qty: parseInt(value),
                });
            }
        }
        if (id === 'purchase-order') {
            this.setState({
                order: value
            });
        }
        this.setState({
            message: ''
        });
    }

    render() {
        const customerOptions = this.createCustomerOptions();
        const skuOptions = this.createSKUOptions();

        console.log(customerOptions)
        console.log(skuOptions)
        return (
            <div>
                <h1>Enter Customer PO's</h1>
                <section>
                    <p>There will need to be inventory validation here - if the qty entered for that SKU overpulls, then the form
                        should not be submitted. Maybe populate current inventory of that product when the SKU is selected? </p>
                    <p>*SELECTED SKU INVENTORY*</p>
                </section>
                <section className="form">
                    <form onSubmit={this.submitCustomerPO}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-options">Customer: </label>
                                    </td>
                                    <td>
                                        <select name="customer-options" id="customer-options" onChange={this.updateSelections} value={this.state.customer}>
                                            {customerOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="sku">SKU:</label>
                                    </td>
                                    <td>
                                        <select name="sku" id="sku" onChange={this.updateSelections} value={this.state.sku}>
                                            {skuOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="quantity">Quantity:</label>
                                    </td>
                                    <td>
                                        <input name="quantity" type="number" id="quantity" value={this.state.qty} onChange={this.updateSelections} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="purchase-order">Purchase Order:</label>
                                    </td>
                                    <td>
                                        <input name="purchase-order" id="purchase-order" value={this.state.order} onChange={this.updateSelections} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Submit Order</button>
                    </form>
                </section>
            </div>
        )
    }
}