import React, { Component } from 'react';
import context from '../context';

export default class AddSKU extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            inventory: []
        }
    }

    componentDidMount(){
        this.setState({
            inventory: this.context.inventory.skus
        })
    }
    // validation code here

    // create table with data

    render() {
        return (
            <div>
                <h1>Add an SKU to the database</h1>
                <p>validate submissions here </p>
                <section className="form">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="sku">SKU: </label>
                                    </td>
                                    <td>
                                        <input name="sku" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="description">Description: </label>
                                    </td>
                                    <td>
                                        <input name="description" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button>Submit SKU</button>
                    </form>
                </section>
            </div>
        )
    }
}

