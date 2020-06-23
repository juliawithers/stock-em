import React, { Component } from 'react';
import context from '../context';

export default class AddSupplier extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            supplier: '',
            supplier_name: '',
            supplier_email: '',
            supplier_number: '',
            supplier_address: '',
        }
    }
    // validation code here

    checkUnique=()=>{
        let skuCheck = 'unique';
        this.context.suppliers.map(item => {
            if (this.state.supplier === item.company) {
                skuCheck = 'not unique';
                return skuCheck;
            } 
            return skuCheck;
        })
        return skuCheck;
    }

    checkRequired=()=>{
        let { company, name, email, phone, address } = this.state;

        if (!company || !name || !email || !phone || !address){
            this.setState({
                message: 'Please fill out all fields'
            })
            return false;
        }
        return true;
    }

    handleSubmitSupplier=(e)=>{
        e.preventDefault();

        const check = this.checkUnique();
        const required = this.checkRequired();
        if (check === 'unique' && required === true) {
            const supplierObj = {
                company: this.state.supplier,
                contact: this.state.supplier_name,
                phone: this.state.supplier_number,
                email: this.state.supplier_email,
                address: this.state.supplier_address
            };
            this.context.submitSupplier(supplierObj); 
            this.setState({
                message: 'Submission successful'
            }) 
        } else if (check === 'not unique' && required === false) {
          
            this.setState({
                message: 'This supplier already exists in the database. Try updating the supplier data in the form below.'
            }); 
        } 
        this.setState({
            suppliers: this.context.suppliers,
            supplier: '',
            supplier_name: '',
            supplier_email: '',
            supplier_number: '',
            supplier_address: '',
        });
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


    render() {
        return (
            <div>
                <h1>Add a supplier to the database</h1>
                <p>validate submissions here </p>
                <p>{this.state.message}</p>
                <section className="form">
                    <form onSubmit={this.handleSubmitSupplier}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier">Supplier name: </label>
                                    </td>
                                    <td>
                                        <input name="supplier" value={this.state.supplier} id="supplier" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-name">Supplier contact name: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-name" value={this.state.supplier_name} id="supplier-contact-name" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-number">Supplier contact number: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-number" value={this.state.supplier_number} id="supplier-contact-number" onChange={this.updateInputs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-email">Supplier contact email: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-email" value={this.state.supplier_email} id="supplier-contact-email" onChange={this.updateInputs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-address">Supplier contact address: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-address" value={this.state.supplier_address} id="supplier-contact-address" onChange={this.updateInputs} />
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
