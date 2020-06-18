import React, { Component } from 'react';
import STORE from './STORE';
import CurrentInventory from './CurrentInventory/CurrentInventory';
import CurrentSuppliers from './CurrentSuppliers/CurrentSuppliers';
import CurrentCustomers from './CurrentCustomers/CurrentCustomers';
import OrderHistory from './OrderHistory/OrderHistory';
import CustomerOrder from './CustomerOrder/CustomerOrder';
import SupplierOrder from './SupplierOrder/SupplierOrder';
import AddCustomer from './AddCustomer/AddCustomer';
import AddSKU from './AddSKU/AddSKU';
import AddSupplier from './AddSupplier/AddSupplier';
import { Route, Link, withRouter, NavLink } from 'react-router-dom';
import './App.css'
import context from './context'
import config from './config'

export default class App extends Component {

  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      inventory: STORE.inventories[0],
      customers: STORE.customers[0],
      suppliers: STORE.suppliers[0],
      past_orders: STORE.past_orders[0],
      click: false
    }
  }
  // validation code here
  // Nav routes and almost all other routes need to be here
  submitCustomerPO = (object) => {
    // submit customer PO to API

  }

  createNavRoutes() {
    if (this.state.click === true) {
      return (
        <div>
          <NavLink
            className="nav-link"
            to="/inventory">Inventory</NavLink>
          <NavLink
            className="nav-link"
            to="/suppliers">Suppliers</NavLink>
          <NavLink
            className="nav-link"
            to="/customers">Customers</NavLink>
          <NavLink
            className="nav-link"
            to="/order-history">Order History</NavLink>
          <NavLink
            className="nav-link"
            to="/add-customer">Add Customers</NavLink>
          <NavLink
            className="nav-link"
            to="/add-SKU">Add SKUs</NavLink>
          <NavLink
            className="nav-link"
            to="/add-supplier">Add Suppliers</NavLink>
          <NavLink
            className="nav-link"
            to="/customer-order">Customer Order</NavLink>
          <NavLink
            className="nav-link"
            to="/supplier-order">Supplier Order</NavLink>
          {/* <button className="logout" onClick={this.handleLogout}>
                        Logout
              </button> */}
        </div>
      )
    } else {
      return <div></div>
    }
  }

  createMainRoutes() {
    return (
      <>
        <Route
          exact
          path="/inventory"
          component={CurrentInventory}
        />
        <Route
          exact
          path="/customers"
          component={CurrentCustomers}
        />
        <Route
          exact
          path="/suppliers"
          component={CurrentSuppliers}
        />
        <Route
          exact
          path="/order-history"
          component={OrderHistory}
        />
        <Route
          exact
          path="/add-customer"
          component={AddCustomer}
        />
        <Route
          exact
          path="/add-SKU"
          component={AddSKU}
        />
        <Route
          exact
          path="/add-supplier"
          component={AddSupplier}
        />
        <Route
          exact
          path="/customer-order"
          component={CustomerOrder}
        />
        <Route
          exact
          path="/supplier-order"
          component={SupplierOrder}
        />
        {/* <Route
                    exact
                    path="/message"
                    component={Message}
                /> */}
      </>
    )
  }

  handleClick=()=>{
    this.setState({
      click:true
    })
  }

  render() {
    const contextValue = {
      inventory: this.state.inventory,
      customers: this.state.customers,
      suppliers: this.state.suppliers,
      past_orders: this.state.past_orders
    };
    console.log(contextValue)
    return (
      <context.Provider value={contextValue}>
        <div>
          <h1>Current Inventory Page</h1>
          <nav role="navigation">
            {this.createNavRoutes()}
          </nav>
          <main>
            <h1>Landing Page</h1>
            <section>
              <p>This app is intendend to help users track their inventory, place orders for customers, and place orders to
                suppliers to inflate inventory when it is low</p>
              <p>Please use the link below to enter the inventory site for SomeCompany Inc.</p>
            </section>
            <button className="enter-button" onClick={this.handleClick}><Link to='/inventory'>Enter</Link></button>
            {this.createMainRoutes()}
          </main>
        </div>
      </context.Provider>
    )
  }
}

