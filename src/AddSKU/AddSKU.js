import React, { Component } from 'react';
import context from '../context';

export default class AddSKU extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            skus: [],
            sku: '',
            description: '',
            message: ''
        }
    }

    componentDidMount(){
        this.setState({
            skus: this.context.skus
        })
    }

    checkUnique=()=>{
        let skuCheck = 'unique';
        this.context.skus.map(item => {
            if (parseInt(this.state.sku) === item.sku) {
                skuCheck = 'not unique';
                return skuCheck;
            } 
            return skuCheck;
        })
        return skuCheck;
    }

    checkRequired=()=>{
        let { sku, description } = this.state;

        if (!sku || !description){
            this.setState({
                message: 'Please fill out all fields'
            });
            return false;
        }
        return true;
    }

    checkSku=()=>{
        if (isNaN(this.state.sku)) {
            this.setState({
                message: 'SKU must be a number'
            });
            return false;
        }
        return true;
    }

    handleSubmitSKUs=(e)=>{
        e.preventDefault();
        const num = this.checkSku();
        const check = this.checkUnique();
        const required = this.checkRequired();
        if (num === true && check === 'unique' && required === true) {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const skuObj = {
                user_id: this.context.user_id,
                sku: this.state.sku,
                inv_description: this.state.description,
                date_entered: date
            };

            this.context.submitSKUs(skuObj); 
            this.setState({
                message: 'Submission successful'
            }) 
        } else if (check === 'not unique') {
          
            this.setState({
                message: 'This SKU already exists in the database'
            }); 
        } 
  
        this.setState({
            sku: '',
            description: '',
        });
    }

    updateInputs=(e)=>{
        const value = e.target.value;
        const id = e.target.id;
        if (id === 'sku') {
            this.setState({
                sku: value
            });    
        }
        if (id === 'description') {
            this.setState({
               description: value
            });
        }
        this.setState({
            message: ''
        });
    }


    render() { 
        return (
            <div className="component-div">
                <h2>Add an SKU to the database</h2>
                <p>Please fill out all fields.</p>
                <p>{this.state.message}</p>
                <section className="form">
                    <form onSubmit={this.handleSubmitSKUs}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="sku">SKU: </label>
                                    </td>
                                    <td>
                                        <input name="sku" value={this.state.sku} id="sku" onChange={this.updateInputs}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="description">Description: </label>
                                    </td>
                                    <td>
                                        <input name="description"value={this.state.description} id="description" onChange={this.updateInputs} />
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

