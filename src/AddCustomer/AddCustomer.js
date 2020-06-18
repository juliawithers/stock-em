import React, { Component } from 'react';
import context from '../context';

export default class AddSupplier extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        this.setState({
            customers: this.context.customers.sustomer_data
        })
    }
    // validation code here

    // create table with data

    render() {
        return (
            <div>
                <h1>Add a customer to the database</h1>
                <p>validate submissions here </p>
                <section className="form">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="customer">Customer name: </label>
                                    </td>
                                    <td>
                                        <input name="customer" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-name">Customer contact name: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-number">Customer contact number: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-email">Customer contact email: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-email" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-bill-address">Customer billing address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-bill-address" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="customer-contact-ship-address">Customer ship-to address: </label>
                                    </td>
                                    <td>
                                        <input name="customer-contact-ship-address" />
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
