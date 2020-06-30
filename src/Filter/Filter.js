import React, { Component } from 'react';
import context from '../context';

export default class Filter extends Component{
    static contextType = context;
    constructor(props){
        super(props);
        this.state = {
            filter_options: 'Choose one',
            filter_choice: 'Choose one',
            options: props.options,
            data: props.data,
            inventory: [],
            past_orders: []
        }    
    }
    
    componentDidMount(){
        this.setState({
            inventory: this.context.inventory,
            past_orders: this.context.past_orders
        })
    }
    
    createFilterOptions = (value) => {
        if (this.state.data === 'inventory') {
            if (value === "sku") {
                let i = 0;
                return this.context.skus.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item.sku}>{item.sku}</option>
                    )
                })
            }
            if (value === "description") {
                let i = 0;
                return this.context.skus.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item.inv_description}>{item.inv_description}</option>
                    )
                })
            }
            if (value === "location") {
                let locArr = [];
                this.context.inventory.map(item => locArr.push(item.inv_location))
                const locations = locArr.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                })

                let i = 0;
                return locations.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item}>{item}</option>
                    )
                })
            }    
        }
        if (this.state.data === 'orders') {
            if (value === "company") {
                let compArr = [];
                this.context.past_orders.map(item => compArr.push(item.company))
                const companies = compArr.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                })

                let i = 0;
                return companies.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item}>{item}</option>
                    )
                })
            }

            if (value === "sku") {
                let i = 0;
                return this.context.skus.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item.sku}>{item.sku}</option>
                    )
                })
            }

            if (value === "description") {
                let i = 0;
                return this.context.skus.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item.inv_description}>{item.inv_description}</option>
                    )
                })
            }

            if (value === "date_entered") {
                let dateArr = [];
                this.context.past_orders.map(item => dateArr.push(item.date_entered))
                const dates = dateArr.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                })

                let i = 0;
                return dates.map(item => {
                    i++;
                    return (
                        <option key={i} name="filter-options" value={item}>{item}</option>
                    )
                })
            }
        }
    }

    createFilterChoices = (e) => {
        e.preventDefault();
        const value = e.target.value;
        if (value === "sku") {
            this.setState({
                filter_choice: value,
                filter_options: this.createFilterOptions(value),
                filter: ''
            })
        }
        if (value === "description") {
            this.setState({
                filter_choice: value,
                filter_options: this.createFilterOptions(value),
                filter: ''
            })
        }
        if (value === "location") {
            this.setState({
                filter_choice: value,
                filter_options: this.createFilterOptions(value),
                filter: ''
            })
        }
        if (value === "company") {
            this.setState({
                filter_choice: value,
                filter_options: this.createFilterOptions(value),
                filter: ''
            })
        }
        if (value === "date_entered") {
            this.setState({
                filter_choice: value,
                filter_options: this.createFilterOptions(value),
                filter: ''
            })
        }
    }

    chooseFilterOption = (e) => {
        e.preventDefault();
        let value = e.target.value;

        this.setState({
            filter: value
        })
    }

    filterInventory = (e) => {
        e.preventDefault();
        if (this.state.data === 'inventory') {
            if (this.state.filter_choice === "sku") {
                const inventory = this.context.inventory.filter(item => item.sku === this.state.filter);
                this.props.handleUpdateInventory(inventory);        
            }
            if (this.state.filter_choice === "description") {
                const inventory = this.context.inventory.filter(item => item.inv_description === this.state.filter);
                this.props.handleUpdateInventory(inventory);
            }
            if (this.state.filter_choice === "location") {
                const inventory = this.context.inventory.filter(item => item.inv_location === this.state.filter);
                this.props.handleUpdateInventory(inventory);
            }    
        }
        if (this.state.data === 'orders') {
            if (this.state.filter_choice === "company") {
                const orders = this.context.past_orders.filter(item => item.company === this.state.filter);
                this.props.handleUpdateOrders(orders);        
            }
            if (this.state.filter_choice === "sku") {
                const orders = this.context.past_orders.filter(item => item.sku === this.state.filter);
                this.props.handleUpdateOrders(orders);        
            }
            if (this.state.filter_choice === "description") {
                const orders = this.context.past_orders.filter(item => item.inv_description === this.state.filter);
                this.props.handleUpdateOrders(orders);
            }
            if (this.state.filter_choice === "date_entered") {
                const orders = this.context.past_orders.filter(item => item.date_entered === this.state.filter);
                this.props.handleUpdateOrders(orders);
            }
        }
    }

    createOptionTags=()=>{
        return this.state.options.map((item,i)=>{
            return (
                <option key={i} name="choose-filter" value={item} id={item}>{item}</option>
            )        
        })
    }

    clear=()=>{
        this.setState({
            filter_choice: 'Choose one',
            filter: 'Choose one',
        })
        if (this.state.data === 'inventory') {
            this.props.handleClearFilter();    
        }
        if (this.state.data === 'orders') {
            this.props.handleClearFilter();    
        }
    }

    render(){
        const options = this.createOptionTags();
        
        return (
            <div className="filter-div">
                <form className="filter" onSubmit={this.filterInventory}>
                    <label htmlFor="choose-filter">Filter by:</label>
                    <select name="choose-filter" value={this.state.filter_choice} onChange={this.createFilterChoices}>
                        <option name="choose-filter">Choose One</option>
                        {options}
                    </select>
                    <label htmlFor="filter-options">Choose Option: </label>
                    <select name="filter-options" onChange={this.chooseFilterOption} value={this.state.filter}>
                        <option name="filter-options">Choose one</option>
                        {this.state.filter_options}
                    </select>
                    <button type="submit">Filter</button>
                </form>
                <button className="unfilter" type="submit" onClick={this.clear}>Clear Filter</button>
            </div>
        )    
    }
}


