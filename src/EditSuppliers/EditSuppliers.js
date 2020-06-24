import React, { Component } from 'react';
import context from '../context';

export default class EditSuppliers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            inventory: [],
            skus: [],
            supplier: '',
            supplier_name: '',
            supplier_email: '',
            supplier_number: '',
            supplier_bill_address: '',
            supplier_ship_address: '',
            id: '',
            message: ''
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

    createsupplierOptions=()=> {
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

    checkRequired=()=>{

        if (!this.state.supplier || !this.state.supplier_name || !this.state.supplier_email || !this.state.supplier_number || !this.state.supplier_address){
            this.setState({
                message: 'Please fill out all fields'
            })
            return false;
        }
        return true;
    }

    handleSubmitsupplierUpdate = e => {
        e.preventDefault();

        const required = this.checkRequired();
        if (required === true) {

            const supplierUpdateObj = {
                user_id: this.context.user_id,
                id: this.state.id,
                company: this.state.supplier,
                contact: this.state.supplier_name,
                email: this.state.supplier_email,
                phone: this.state.supplier_number,
                address: this.state.supplier_address
            }
            this.context.submitSupplierUpdate(supplierUpdateObj);    
            this.setState({
                message: 'Submission completed'
            })
        } else if (required === false) {
            this.setState({
                message: 'Please adjust your quantities as this is overdrafting from inventory'
            })
        }

        this.setState({
            suppliers: this.context.suppliers,
            inventory: this.context.inventory,
            skus: this.context.skus,
            id: '',
            supplier: '',
            supplier_name: '',
            supplier_email: '',
            supplier_number: '',
            supplier_address: ''
        })
    }

    updateInputs=(e)=>{
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'supplier') {
            this.setState({
                supplier: value
            });
        }
        if (id === 'supplier-contact-name') {
            this.setState({
               supplier_name: value
            });
        }
        if (id === 'supplier-contact-number') {
            this.setState({
                supplier_number: value,
            });
        }
        if (id === 'supplier-contact-email') {
            this.setState({
                supplier_email: value
            });
        }
        if (id === 'supplier-contact-address') {
            this.setState({
                supplier_address: value
            });
        }
        this.setState({
            message: ''
        });
    }

    updateSelections=(e)=>{
        e.preventDefault();
        const value = e.target.value;

        let selected = this.context.suppliers.find(item => value === item.company)

        this.setState({
            id: Number(selected.id),
            supplier: value,
            supplier_name: selected.contact,
            supplier_email: selected.email,
            supplier_number: selected.phone,
            supplier_address: selected.address,
        })
    }

    render() {
        const supplierOptions = this.createsupplierOptions();

        return (
            <div className="component-div">
                <h1>Edit Supplier Information</h1>
                <section>
                    <p>Double check your entries before submission.</p>
                    <p>{this.state.message}</p>
                </section>
                <section className="form">
                    <form onSubmit={this.handleSubmitsupplierUpdate} id="supplier-PO-form">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-options">Supplier: </label>
                                    </td>
                                    <td>
                                        <select name="supplier-options" id="supplier-options" onChange={this.updateSelections} value={this.state.supplier}>
                                            <option defaultValue="Choose One">Choose One</option>
                                            {supplierOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-name">Supplier contact name: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-name" defaultValue={this.state.supplier_name} id="supplier-contact-name" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-number">Supplier contact number: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-number" defaultValue={this.state.supplier_number} id="supplier-contact-number" onChange={this.updateInputs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-email">Supplier contact email: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-email" defaultValue={this.state.supplier_email} id="supplier-contact-email" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-bill-address">Supplier address: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-bill-address" defaultValue={this.state.supplier_address} id="supplier-contact-address" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Update Supplier</button>
                    </form>
                </section>
            </div>
        )
    }
}