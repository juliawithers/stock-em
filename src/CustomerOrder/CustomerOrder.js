import React from 'react';

export default class CustomerOrder extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            customers: this.context.customers.customer_data,
            inventory: this.context.inventory,
            sku: '',
            customer: '',
            qty:'',
            order: '',
            description: ''
        }
    }
    // validation code here

    createCustomerOptions() {
        let options = this.state.customers;
        return options.map((item, i )=> {
            `<option
            key={i}
            value={${item.company}}>
                ${item.company}
            </option>`
        });
    }

    createSKUOptions() {
        let options = this.state.inventory;
        return options.map((item, i )=> {
            `<option
            key={i}
            value={${item.sku}}>
                ${item.sku}
            </option>`
        });
    }

    verifySKUQuantity(options, qty, sku){
        let sum=0;
        options.map((item,i)=>{
            if (item.sku === sku) {
                sum+= item.quantity;    
            }
            return `SKU is not in the database`
        })

        if (qty > sum) {
            return `<p>SKU ${sku} quantity: ${qty}, you cannot overdraft from inventory</p>`
        }
        return `<p></p>`;
    }

    submitCustomerPO = (e) => {
        e.preventDefault();

        this.state.inventory.find(item=>{
            if (item.sku == this.state.sku) {
                this.setState({
                    description: item.description
                })
            }
        })

        this.verifySKUQuantity(this.state.inventory,this.state.qty,this.state.sku);
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

    updateSelections(){
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
        return (
            <div>
                <h1>Enter Customer PO's</h1>
                <section>
                    <p>There will need to be inventory validation here - if the qty entered for that SKU overpulls, then the form
                        should not be submitted. Maybe populate current inventory of that product when the SKU is selected? </p>
                    <p>*SELECTED SKU INVENTORY*</p>
                </section>
                <section class="form">
                    <form onSubmit={this.submitCustomerPO}>
                        <table>
                            <tr>
                                <td>
                                    <label for="customer-options">Customer: </label>
                                </td>
                                <td>
                                    <select name="customer-options" id="customer-options" onChange={this.updateSelections}>
                                        {this.createCustomerOptions}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="sku">SKU:</label>
                                </td>
                                <td>
                                    <select name="sku" id="sku" onChange={this.updateSelections}>
                                        {this.createSKUOptions}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="quantity">Quantity:</label>
                                </td>
                                <td>
                                    <input name="quantity" type="number" id="quantity" onChange={this.updateSelections}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="purchase-order">Purchase Order:</label>
                                </td>
                                <td>
                                    <input name="purchase-order" id="purchase-order" onChange={this.updateSelections}/>
                                </td>
                            </tr>
                        </table>
                        <button>Submit Order</button>
                    </form>
                </section>
            </div>
        )
    }
}