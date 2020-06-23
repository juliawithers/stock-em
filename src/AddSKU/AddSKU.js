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
    // validation code here
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
            })
            return false;
        }
        return true;
    }

    handleSubmitSKUs=(e)=>{
        e.preventDefault();
        const check = this.checkUnique();
        const required = this.checkRequired();
        if (check === 'unique' && required === true) {
            const skuObj = {
                sku: Number(this.state.sku),
                description: this.state.description
            };

            this.context.submitSKUs(skuObj); 
            this.setState({
                message: 'Submission successful'
            }) 
        } else if (check === 'not unique' && required === false) {
          
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
            <div>
                <h1>Add an SKU to the database</h1>
                <p>validate submissions here </p>
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

