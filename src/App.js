import React, { Component } from 'react';
import CurrentInventory from './CurrentInventory/CurrentInventory';
import CurrentSuppliers from './CurrentSuppliers/CurrentSuppliers';
import CurrentCustomers from './CurrentCustomers/CurrentCustomers';
import OrderHistory from './OrderHistory/OrderHistory';
import CustomerOrder from './CustomerOrder/CustomerOrder';
import SupplierOrder from './SupplierOrder/SupplierOrder';
import AddCustomer from './AddCustomer/AddCustomer';
import AddSKU from './AddSKU/AddSKU';
import AddSupplier from './AddSupplier/AddSupplier';
import { Route, Link, NavLink } from 'react-router-dom';
import './App.css'
import Hamburger from './pictures/hamburger.png'
import xOut from './pictures/x_out.png'
import context from './context'
import config from './config' 

// create separate landing endpoint just for posterity sake

export default class App extends Component {

  static contextType = context;
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      customers: [],
      suppliers: [],
      past_orders: [],
      skus: [],
      click: false,
      user_id: '',
      submitCustomerPO: () => { },
      submitSupplierPO: () => { },
      submitSupplier: () => { },
      submitCustomer: () => { },
      submitSKUs: () => { },
      submitSupplierUpdate: () => { },
      submitCustomerUpdate: () => { },
      menu: '',
      icon: '',
      error: ''
    }
    this.hamburgerClick.bind(this)
    this.handleHamClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      user_id: 1,
      menu: 'hide',
      icon: Hamburger
    })
    this.getAllCustomers();
    this.getAllInventory();
    this.getAllSuppliers();
    this.getAllSkus();
    this.getAllPastOrders();
  }

  getAllInventory=()=>{
   
    fetch(config.API_ENDPOINT+`/inventory/?user_id=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(inventory=>{
        this.setState({
          inventory: inventory
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  getAllCustomers=()=>{
  
    fetch(config.API_ENDPOINT+`/customers/?user_id=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(customers=>{
        this.setState({
          customers: customers
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  getAllSuppliers=()=>{
    fetch(config.API_ENDPOINT+`/suppliers/?user_id=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(suppliers=>{
        this.setState({
          suppliers: suppliers
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  getAllPastOrders=()=>{
    fetch(config.API_ENDPOINT+`/past-orders/?user_id=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(past_orders=>{
        this.setState({
          past_orders: past_orders
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  getAllSkus=()=>{
    fetch(config.API_ENDPOINT+`/skus/?user_id=${1}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(skus=>{
        this.setState({
          skus: skus
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitSupplier = (object) => {
    fetch(config.API_ENDPOINT+`/suppliers`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllSuppliers();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })

  }

  submitCustomer = (object) => {
    fetch(config.API_ENDPOINT+`/customers`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllCustomers();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitSKUs = (object) => {
    fetch(config.API_ENDPOINT+`/skus`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllSkus();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitCustomerPO = (object) => {
    this.updateInventory(object, 'customerPO');
  }

  submitSupplierPO = (object) => {
    this.updateInventory(object, 'supplierPO'); 
  }

  submitSupplierUpdate = (object) => {
    fetch(config.API_ENDPOINT+`/suppliers`, {
      method: 'PATCH',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllSuppliers();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitCustomerUpdate = (object) => {
    fetch(config.API_ENDPOINT+`/customers`, {
      method: 'PATCH',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllCustomers();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })

  }

  submitUpdatePastOrders=(object)=>{
    console.log(object)
    fetch(config.API_ENDPOINT+`/past-orders`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllPastOrders();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitUpdateInventory=(object)=>{
    fetch(config.API_ENDPOINT+`/inventory`, {
      method: 'PATCH',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllInventory();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  submitAddInventory=(object)=>{
    fetch(config.API_ENDPOINT+`/inventory`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        this.getAllInventory();
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  updateInventory = (object, reason) => {
    console.log('updateInventory ran')
    let sku = object.sku;

    if (reason === 'customerPO') {
      console.log('if reason customerPO ran')
      let customerObj = {
        user_id: this.state.user_id,
        company: object.company,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        cust_order: object.cust_order,
        sup_order: object.sup_order,
        date_entered: object.date_entered
      };

      console.log(customerObj)
      console.log(this.state.inventory)
      let filteredInventory = this.state.inventory.filter(item => item.sku === sku.toString());
      console.log(filteredInventory)

      const sortedInventory = filteredInventory.slice().sort((itemA, itemB) => new Date(itemA.date_entered) - new Date(itemB.date_entered));
      console.log(sortedInventory)


      if (sortedInventory.length > 0) {
        console.log('if ran')
        this.findOldestInventory(object, sortedInventory);
      }
  
      this.submitUpdatePastOrders(customerObj);      
    }
    else if (reason === 'supplierPO') {
      let supplierObj = {
        user_id: this.state.user_id,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        inv_location: object.inv_location,
        date_entered: object.date_entered
      };
  
      this.submitAddInventory(supplierObj);

      let supObj = {
        user_id: this.state.user_id,
        company: object.company,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        cust_order: object.cust_order,
        sup_order: object.sup_order,
        date_entered: object.date_entered
      };

      this.submitUpdatePastOrders(supObj);
    }
  }

  findOldestInventory = (object, sortedInventory) => {
    let quantity = 0;
    let invArr = this.state.inventory;
    for (let i = 0; i < sortedInventory.length; i++) {
      let qty = sortedInventory[i].quantity
      if (qty > object.quantity) {
        quantity += qty;
        
        let id = sortedInventory[i].id;
        let diff = quantity - object.quantity;

        this.adjustQuantity(invArr, id, diff)
        return
      }
      else if (qty <= object.quantity) {
        quantity += qty;
        
        let workingArr = invArr;
        invArr = this.deleteInventory(workingArr, sortedInventory[i].id);
      }
    }

    this.getAllInventory();
  }

  adjustQuantity = (inventory, id, diff) => {
    let item = inventory.find(item => item.id === id);

    let newItem = {
      id: item.id,
      user_id: this.state.user_id,
      sku: item.sku,
      quantity: diff,
      inv_description: item.inv_description,
      inv_location: item.inv_location,
      date_entered: item.date_entered
    };

    this.submitUpdateInventory(newItem);
  }

  deleteInventory = (inventory, id) => {
    fetch(config.API_ENDPOINT+`/inventory`, {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .catch(error => {
        this.setState({ error })
      })
      
    return inventory.filter((el) => {
      return el.id !== id;
    });
  }

  createNavRoutes() {

    return (
      <div className="navigation">

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
          to="/add-customer">Add & Edit Customers</NavLink>
        <NavLink
          className="nav-link"
          to="/add-supplier">Add & Edit Suppliers</NavLink>
        <NavLink
          className="nav-link"
          to="/add-SKU">Add SKUs</NavLink>
        <NavLink
          className="nav-link"
          to="/customer-order">Customer Order</NavLink>
        <NavLink
          className="nav-link"
          to="/supplier-order">Supplier Order</NavLink>
      </div>
    )

  }

  hamburgerClick = () => {
    if (this.state.click === true) {
      return (
        <span className="ham">
          <img id="hamburger" src={this.state.icon} onClick={this.handleHamClick} alt="Hamburger Menu for Smaller Screensize" />
        </span>
      )
    } else {
      return <div></div>
    }
  }

  handleHamClick = () => {
    if (this.state.menu === 'hide') {
      this.setState({
        menu: 'show',
        icon: xOut
      })
    } else if (this.state.menu === 'show') {
      this.setState({
        menu: 'hide',
        icon: Hamburger
      })
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
      </>
    )
  }

  handleClick = () => {
    this.setState({
      click: true
    })
    this.getAllCustomers();
    this.getAllInventory();
    this.getAllSuppliers();
    this.getAllSkus();
    this.getAllPastOrders();
  }

  createLanding() {
    if (this.state.click === false) {
      return (
        <div className="landing">
          <h2>Landing Page</h2>
          <section>
            <p>This app is intendend to help users track their inventory, place orders for customers, and place orders to
                suppliers to inflate inventory when it is low</p>
            <p>Please use the link below to enter the inventory site for SomeCompany Inc.</p>
          </section>
          <button className="enter-button" onClick={this.handleClick}><Link to='/inventory'>Enter</Link></button>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    const contextValue = {
      inventory: this.state.inventory,
      customers: this.state.customers,
      suppliers: this.state.suppliers,
      past_orders: this.state.past_orders,
      skus: this.state.skus,
      submitCustomerPO: this.submitCustomerPO,
      submitSupplierPO: this.submitSupplierPO,
      submitSupplier: this.submitSupplier,
      submitCustomer: this.submitCustomer,
      submitSKUs: this.submitSKUs,
      submitCustomerUpdate: this.submitCustomerUpdate,
      submitSupplierUpdate: this.submitSupplierUpdate,
      user_id: this.state.user_id,

    };

    let menu = this.state.menu === 'hide'
      ? <div></div>
      : <div className="menu">
        {this.createNavRoutes()}
      </div>

    return (
      <context.Provider value={contextValue}>
        <div className="app">
          <header><h1>Stock'Em!</h1></header>
          <nav role="navigation">
            <div className="small-screen">
              {this.hamburgerClick()}
              {menu}  
            </div>
            <div className="big-screen">
              {this.createNavRoutes()}
            </div>
          </nav>
          <main>
            {this.createLanding()}
            {this.createMainRoutes()}
          </main>
        </div>
      </context.Provider>
    )
  }
}

