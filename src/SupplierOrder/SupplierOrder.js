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
            description: '',
            message: '',
            sku_message: '',
            selected: ''
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
        let options = this.context.suppliers;
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
        let options = this.context.skus;
        return options.map((item, i) => {
            return (
            <option
            key={i}
            value={item.sku}>
                {item.sku}
            </option>)
        });
    }



    checkRequired=()=>{

        if (!this.state.supplier || !this.state.sku || !this.state.qty){
            this.setState({
                message: 'Please fill out Supplier, SKU, and Quantity fields.'
            })
            return false;
        }
        return true;
    }

    handleSubmitSupplierPO = e => {
        e.preventDefault();
        const required = this.checkRequired();

        if (required === true) {
            const item = this.context.skus.find(item => item.sku === this.state.sku);
            const description = item.description;

            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const supplierPOobj = {
                id: this.state.selected.id,
                user_id: this.context.user_id,
                company: this.state.supplier,
                sku: Number(this.state.sku),
                quantity: Number(this.state.qty),
                description: description,
                cust_order: '',
                sup_order: this.state.order,
                date_entered: date
            };
            this.context.submitSupplierPO(supplierPOobj);    
            this.setState({
                message: 'Submission successful.'
            })
        }         

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
            let selected = this.context.suppliers.find(item => value === item.company);
            this.setState({
                supplier: value,
                id: selected.id
            });
        }
        if (id === 'sku') {
            this.setState({
                sku: Number(value)
            });
            this.showSelectedSKU(value)
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

    showSelectedSKU(value){
        let selectedSku = this.context.inventory.filter(item => item.sku === Number(value))
       
        let sum=0;
        selectedSku.forEach(item =>{
            sum += item.quantity;
        })

        this.setState({
            sku_message: `SKU: ${value}, Quantity: ${sum}`
        })
    }

    render() {
        const suppliersOptions = this.createSupplierOptions();
        const skuOptions = this.createSKUOptions();

        return (
            <div className="component-div">
                <h1>Enter Supplier PO's</h1>
                <p>This is a representative form for submitting supplier PO's   receiving in inventory. Please fill out all fields.</p>
                <p>{this.state.sku_message}</p>
                <p>{this.state.message}</p>
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