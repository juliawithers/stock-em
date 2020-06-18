import React, { Component } from 'react';
import context from '../context';

export default class AddSupplier extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            suppliers: []
        }
    }
    componentDidMount(){
        this.setState({
            suppliers: this.context.suppliers.suppliers_data
        })
    }
    // validation code here

    // create table with data

    render() {
        return (
            <div>
                <h1>Add a supplier to the database</h1>
                <p>validate submissions here </p>
                <section class="form">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier">Supplier name: </label>
                                    </td>
                                    <td>
                                        <input name="supplier" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-name">Supplier contact name: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-name" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-number">Supplier contact number: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-number" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-email">Supplier contact email: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-email" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="supplier-contact-address">Supplier contact address: </label>
                                    </td>
                                    <td>
                                        <input name="supplier-contact-address" />
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
