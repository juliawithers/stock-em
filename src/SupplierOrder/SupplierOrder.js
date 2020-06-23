import React, { Component } from 'react';
import context from '../context';

export default class SupplierOrder extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            inventory: [],
            skus: [],
            sku: '',
            supplier: '',
            qty: '',
            order: '',
            description: ''
        }
    }

    componentDidMount(){
        this.setState({
            suppliers: this.context.suppliers,
            inventory: this.context.inventory,
            skus: this.context.skus
        })
    }
    // validation code here

    createSupplierOptions() {
        let options = this.state.suppliers;
        return options.map((item, i) => {
            return (
            <option
            key={i}
            value={item.company}>
                {item.company}
            </option>)
        });
    }

    createSKUOptions() {
        let options = this.state.skus;
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

    handleSubmitSupplierPO = e => {
        e.preventDefault();
        const item = this.state.skus.find(item => item.sku.toString() === this.state.sku);
        const description = item.description;

        this.verifySKUQuantity(this.state.inventory, this.state.qty, this.state.sku);
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const supplierPOobj = {
            user_id: this.context.user_id,
            company: this.state.supplier,
            sku: Number(this.state.sku),
            quantity: Number(this.state.qty),
            description: description,
            order: this.state.order,
            date_added: date
        };
        this.context.submitSupplierPO(supplierPOobj);

        this.setState({
            suppliers: this.context.suppliers,
            inventory: this.context.inventory,
            skus: this.context.skus,
            sku: '',
            supplier: '',
            qty: '',
            order: '',
            description: ''
        });
    }

    updateSelections = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'supplier-options') {
            this.setState({
                supplier: value
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
        const suppliersOptions = this.createSupplierOptions();
        const skuOptions = this.createSKUOptions();

        return (
            <div>
                <h1>Enter Supplier PO's</h1>
                <p>This is a representative form for submitting supplier PO's and receiving in inventory.</p>
                <section className="form">
                    <form onSubmit={this.handleSubmitSupplierPO}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-options">Suppliers: </label>
                                    </td>
                                    <td>
                                        <select name="supplier-options" id="supplier-options" onChange={this.updateSelections} value={this.state.supplier}>
                                            <option defaultValue="Choose One">Choose One</option>
                                            {suppliersOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="sku">SKU: </label>
                                    </td>
                                    <td>
                                        <select name="sku" id="sku" onChange={this.updateSelections} value={this.state.sku}>
                                            <option defaultValue="Choose One">Choose One</option>
                                            {skuOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="quantity">Quantity: </label>
                                    </td>
                                    <td>
                                        <input name="quantity" type="number" value={this.state.qty} 
                                        id="quantity" onChange={this.updateSelections}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="purchase-order">Purchase Order: </label>
                                    </td>
                                    <td>
                                        <input name="purchase-order" id="purchase-order" value={this.state.order} onChange={this.updateSelections}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}