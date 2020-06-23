import React, { Component } from 'react';
import context from '../context';

export default class EditCustomers extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            inventory: [],
            skus: [],
            customer: '',
            customer_name: '',
            customer_email: '',
            customer_number: '',
            customer_bill_address: '',
            customer_ship_address: '',
            id: '',
            message: ''
        }
    }

    componentDidMount(){
        this.setState({
            customers: this.context.customers,
            inventory: this.context.inventory,
            skus: this.context.skus
        })
    }
    // validation code here

    createCustomerOptions=()=> {
        let options = this.context.customers;
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
        if (!this.state.customer || !this.state.customer_name || !this.state.customer_email || !this.state.customer_number || !this.state.customer_bill_address || !this.state.customer_ship_address){
            this.setState({
                message: 'Please fill out all fields'
            })
            return false;
        }
        return true;
    }

    handleSubmitCustomerUpdate = e => {
        e.preventDefault();

        const required = this.checkRequired();
        if (required === true) {    

            const customerUpdateObj = {
                user_id: this.context.user_id,
                id: this.state.id,
                company: this.state.customer,
                contact: this.state.customer_name,
                email: this.state.customer_email,
                phone: this.state.customer_number,
                bill_address: this.state.customer_bill_address,
                ship_address: this.state.customer_ship_address
            }
            this.context.submitCustomerUpdate(customerUpdateObj);    
            this.setState({
                message: 'Submission completed'
            })
        } 

        this.setState({
            customers: this.context.customers,
            inventory: this.context.inventory,
            skus: this.context.skus,
            id: '',
            customer: '',
            customer_name: '',
            customer_email: '',
            customer_number: '',
            customer_bill_address: '',
            customer_ship_address: ''
        })
    }

    updateInputs=(e)=>{
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'customer') {
            this.setState({
                customer: value
            });
        }
        if (id === 'customer-contact-name') {
            this.setState({
               customer_name: value
            });
        }
        if (id === 'customer-contact-number') {
            this.setState({
                customer_number: value,
            });
        }
        if (id === 'customer-contact-email') {
            this.setState({
                customer_email: value
            });
        }
        if (id === 'customer-contact-bill-address') {
            this.setState({
                customer_bill_address: value
            });
        }
        if (id === 'customer-contact-ship-address') {
            this.setState({
                customer_ship_address: value
            });
        }
        this.setState({
            message: ''
        });
    }

    updateSelections=(e)=>{
        e.preventDefault();
        const value = e.target.value;

        let selected = this.context.customers.find(item => value === item.company)

        this.setState({
            id: Number(selected.id),
            customer: value,
            customer_name: selected.contact,
            customer_email: selected.email,
            customer_number: selected.phone,
            customer_bill_address: selected.bill_address,
            customer_ship_address: selected.ship_address
        })
    }

    render() {
        const customerOptions = this.createCustomerOptions();

        return (
            <div>
                <h1>Edit Customer Information</h1>
                <p>Double check your entries before submission.</p>
                <section>
                    <p>{this.state.message}</p>
                </section>
                <section className="form">
                    <form onSubmit={this.handleSubmitCustomerUpdate} id="customer-PO-form">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-options">Customer: </label>
                                    </td>
                                    <td>
                                        <select name="customer-options" id="customer-options" onChange={this.updateSelections} value={this.state.customer}>
                                            <option defaultValue="Choose One">Choose One</option>
                                            {customerOptions}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-name">Customer contact name: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-name" defaultValue={this.state.customer_name} id="customer-contact-name" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-number">Customer contact number: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-number" defaultValue={this.state.customer_number} id="customer-contact-number" onChange={this.updateInputs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-email">Customer contact email: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-email" defaultValue={this.state.customer_email} id="customer-contact-email" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-bill-address">Customer billing address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-bill-address" defaultValue={this.state.customer_bill_address} id="customer-contact-bill-address" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-ship-address">Customer ship-to address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-ship-address" defaultValue={this.state.customer_ship_address} id="customer-contact-ship-address" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Update Customer</button>
                    </form>
                </section>
            </div>
        )
    }
}