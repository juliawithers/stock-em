import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import context from '../context';
import EditCustomers from '../EditCustomers/EditCustomers';

class AddCustomer extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            customer_name: '',
            customer_email: '',
            customer_number: '',
            customer_bill_address: '',
            customer_ship_address: '',
            message: '',
        }
    }

    checkUnique=()=>{
        let custCheck = 'unique';
        this.context.customers.map(item => {
            if (this.state.customer === item.company) {
                custCheck = 'not unique';
                return custCheck;
            } 
            return custCheck;
        })
        return custCheck;
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

    handleSubmitCustomer=(e)=>{
        e.preventDefault();
        const check = this.checkUnique();
        const required = this.checkRequired();
        if (check === 'unique' && required === true){
            const customerObj = {
                user_id: this.context.user_id,
                company: this.state.customer,
                contact: this.state.customer_name,
                phone: this.state.customer_number,
                email: this.state.customer_email,
                bill_address: this.state.customer_bill_address,
                ship_address: this.state.customer_ship_address
            };
            this.context.submitCustomer(customerObj);
            this.setState({
                message: 'Submission successful'
            }) 
        } else if (check === 'not unique') {
            this.setState({
                message: 'This customer already exists in the database. Try updating the customer data in the form below.'
            }); 
        }

        this.setState({
            customer: '',
            customer_name: '',
            customer_email: '',
            customer_number: '',
            customer_bill_address: '',
            customer_ship_address: ''
        });   
        
        this.props.history.push('/customers');
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

    render() {
        return (
            <div className="component-div">
                <h2>Add a customer to the database</h2>
                <p>Please fill out all fields.</p>
                <p>{this.state.message}</p>
                <section className="form">
                    <form onSubmit={this.handleSubmitCustomer}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="customer">Customer business name: </label>
                                    </td>
                                    <td>
                                        <input name="customer" value={this.state.customer} id="customer" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-name">Customer contact name: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-name" value={this.state.customer_name} id="customer-contact-name" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-number">Customer contact number: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-number" value={this.state.customer_number} id="customer-contact-number" onChange={this.updateInputs} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-email">Customer contact email: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-email" value={this.state.customer_email} id="customer-contact-email" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-bill-address">Customer billing address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-bill-address" value={this.state.customer_bill_address} id="customer-contact-bill-address" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-ship-address">Customer ship-to address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-ship-address" value={this.state.customer_ship_address} id="customer-contact-ship-address" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Submit</button>
                    </form>
                </section>
                <section>
                    <EditCustomers/>
                </section>
            </div>
        )
    }
}

export default withRouter(AddCustomer)
