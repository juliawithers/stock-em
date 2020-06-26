import React, { Component } from 'react';
import context from '../context';

export default class CurrentInventory extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            filter_choice: 'Choose one',
            filter_options: 'Choose one',
            filter: '',
            sort_choice: 'Choose one'
        }
    }

    componentDidMount() {
        this.setState({
            inventory: this.context.inventory
        })
    }

    createInventoryTables() {
        return this.state.inventory.map((lineItem, i) => {
            const { id, sku, quantity, inv_description, inv_location, date_entered } = lineItem;

            let dateArr = date_entered.split('-');
            let date = [];
            date.push(dateArr[0])
            if (dateArr[1].length === 1) {
                date.push('0' + dateArr[1]);
            }
            if (dateArr[2].length === 1) {
                date.push('0' + dateArr[2]);
            }
            let fullDate = date.join('-');

            return (
                <tr key={id}>
                    <td>{sku}</td>
                    <td>{quantity}</td>
                    <td>{inv_description}</td>
                    <td>{inv_location}</td>
                    <td>{fullDate}</td>
                </tr>
            )
        })
    }
    // try to filter by SKU or Description or Loacation
    // Something like : Filter By: <>options<> Options: <>filter options<> <>submit button<>

    createFilterOptions = (value) => {
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
        if (this.state.filter_choice === "sku") {
            const inventory = this.context.inventory.filter(item => item.sku === Number(this.state.filter));

            this.setState({
                inventory: inventory
            })
        }
        if (this.state.filter_choice === "description") {
            const inventory = this.context.inventory.filter(item => item.inv_description === this.state.filter);

            this.setState({
                inventory: inventory
            })
        }
        if (this.state.filter_choice === "location") {
            const inventory = this.context.inventory.filter(item => item.inv_location === this.state.filter);

            this.setState({
                inventory: inventory
            })
        }
    }

    clearFilter = (e) => {
        e.preventDefault();
        this.setState({
            filter_choice: 'Choose one',
            filter_options: 'Choose one',
            filter: '',
            inventory: this.context.inventory
        })
    }

    sortInventory = (e) => {
        e.preventDefault();
        if (this.state.sort_choice === "date") {
            const inventory = this.state.inventory.sort(function (itemA, itemB) {
                let keyA = new Date(itemA.date_entered);
                let keyB = new Date(itemB.date_entered);
                if (keyB < keyA) return -1;
                if (keyB > keyA) return 1;
                return 0;
            });

            this.setState({
                inventory: inventory
            })
        }
        if (this.state.sort_choice === "quantity") {
            const inventory = this.state.inventory.sort(function (itemA, itemB) {
                let keyA = new Date(itemA.quantity);
                let keyB = new Date(itemB.quantity);
                if (keyA < keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });

            this.setState({
                inventory: inventory
            })
        }
    }

    saveSortChoice = (e) => {
        e.preventDefault();
        this.setState({
            sort_choice: e.target.value
        })
    }

    clearSort = (e) => {
        e.preventDefault();
        this.setState({
            sort_choice: 'Choose one',
            inventory: this.context.inventory
        })
    }

    render() {
        return (
            <div className="component-div">
                <h2>Current Inventory Page</h2>
                <p> Table of current Inventory: </p>
                <div className="options">
                    <div className="filter-div">
                        <form className="filter" onSubmit={this.filterInventory}>
                            <label htmlFor="choose-filter">Filter by:</label>
                            <select name="choose-filter" onChange={this.createFilterChoices}>
                                <option name="choose-filter" value={this.state.filter_choice}>Choose one</option>
                                <option name="choose-filter" value="sku" id="sku">SKU</option>
                                <option name="choose-filter" value="description" id="description">Description</option>
                                <option name="choose-filter" value="location" id="location">Location</option>
                            </select>
                            <label htmlFor="filter-options">Choose Option: </label>
                            <select name="filter-options" onChange={this.chooseFilterOption} value={this.state.filter_options}>
                                <option name="filter-options">Choose one</option>
                                {this.state.filter_options}
                            </select>
                            <button type="submit">Filter</button>
                        </form>
                        <button className="unfilter" type="submit" onClick={this.clearFilter}>Clear Filter</button>
                    </div>
                    <div className="sort-div">
                        <form className="sort" onSubmit={this.sortInventory}>
                            <label htmlFor="choose-sort">Sort by:</label>
                            <select name="choose-sort" onChange={this.saveSortChoice} value={this.state.sort_choice}>
                                <option name="choose-sort">Choose one</option>
                                <option name="choose-sort" value="date" id="date">Date(oldest first)</option>
                                <option name="choose-sort" value="quantity" id="quantity">Quantity(least first)</option>
                            </select>
                            <button type="submit">Sort</button>
                        </form>
                        <button className="unsort" type="submit" onClick={this.clearSort}>Clear Sort</button>
                    </div>
                </div>

                <div className="table">
                    <table className="scrolling-wrapper">
                        <tbody>
                            <tr>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date Received (ymd)</th>
                            </tr>
                            {this.createInventoryTables()}
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

