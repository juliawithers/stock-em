import React, { Component } from 'react';
import context from '../context';

export default class Sort extends Component {
    static contextType = context;
    constructor(props) {
        super(props);
        this.state = {
            sort_choice: '',
            data: [],
            inventory: [],
            past_orders: [],
            ident: ''
        }
    }

    componentDidMount() {
        this.setState({
            inventory: this.context.inventory,
            past_orders: this.context.past_orders,
            data: this.props.data
        })
    }

    sortData = (e) => {
        console.log(this.props.data)
        e.preventDefault();
        if (this.state.sort_choice === "date") {
            const data = this.props.data.sort(function (itemA, itemB) {
                let keyA = new Date(itemA.date_entered);
                let keyB = new Date(itemB.date_entered);
                if (keyB < keyA) return -1;
                if (keyB > keyA) return 1;
                return 0;
            });
           
            this.props.handleUpdateFunction(data)
        }
        if (this.state.sort_choice === "quantity") {
            const data = this.props.data.sort(function (itemA, itemB) {
                let keyA = Number(itemA.quantity);
                let keyB = Number(itemB.quantity);
                if (keyA < keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            
            this.props.handleUpdateFunction(data)
        }
    }


    saveSortChoice = (e) => {
        e.preventDefault();
        this.setState({
            sort_choice: e.target.value
        })
    }

    clear = (e) => {
        e.preventDefault();
        this.setState({
            sort_choice: 'Choose one',
        })
        if (this.state.ident === 'inventory') {
            this.props.handleClearSort();    
        }
        if (this.state.ident === 'orders') {
            this.props.handleClearSort();    
        }
        
    }

    render() {
        return (
            <div className="sort-div">
                <form className="sort" onSubmit={this.sortData}>
                    <label htmlFor="choose-sort">Sort by:</label>
                    <select name="choose-sort" onChange={this.saveSortChoice} value={this.state.sort_choice}>
                        <option name="choose-sort">Choose one</option>
                        <option name="choose-sort" value="date" id="date">Date(desc)</option>
                        <option name="choose-sort" value="quantity" id="quantity">Quantity(asc)</option>
                    </select>
                    <button type="submit">Sort</button>
                </form>
                <button className="unsort" type="submit" onClick={this.clear}>Clear Sort</button>
            </div>
        )
    }
}




