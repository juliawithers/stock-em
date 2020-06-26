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
import { Route, Link, NavLink } from 'react-router-dom';
import './App.css'
import context from './context'
// import config from './config'
// withrouter
// need to add user_id to all data submitted to the db
// Should be able to add supplier order to order histories as well!

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
      submitCustomerPO: ()=>{},
      submitSupplierPO: ()=>{},
      submitSupplier: ()=>{},
      submitCustomer: ()=>{},
      submitSKUs: ()=>{},
      submitSupplierUpdate: ()=>{},
      submitCustomerUpdate: ()=>{},
    }
  }

  componentDidMount(){
    this.setState({
      inventory: STORE.inventories[0].skus,
      customers: STORE.customers[0].customers_data,
      suppliers: STORE.suppliers[0].suppliers_data,
      past_orders: STORE.past_orders[0].order_history,
      skus: STORE.skus[0].skus,
      user_id: STORE.users[0].id,
    })
  }
  // validation code here

  submitSupplier=(object)=>{
    let ids = this.findMaxId(this.state.suppliers);
    let id = ids + 1;
    let newObject = {
      id,
      ...object
    }
    this.state.suppliers.push(newObject);
    this.setState({
      suppliers: this.state.suppliers
    });
  }

  submitCustomer=(object)=>{
    let idc = this.findMaxId(this.state.customers);
    let id = idc + 1;
    let newObject = {
      id,
      ...object
    }
    this.state.customers.push(newObject);
    this.setState({
      customers: this.state.customers
    });
  }

  submitSKUs=(object)=>{
    let idsku = this.findMaxId(this.state.skus);
    let id = idsku + 1;
    let newObject = {
      id,
      ...object
    }
    this.state.skus.push(newObject);
    this.setState({
      skus: this.state.skus
    });
  }

  submitCustomerPO = (object) => {
    // handle the change in inventory
    // submit customer PO to API
    this.updateInventory(object, 'customerPO');
  }

  submitSupplierPO = (object) => {
    // handle the change in inventory
    // submit customer PO to API
    this.updateInventory(object, 'supplierPO');
  }

  submitSupplierUpdate=(object)=>{
    const newSup = this.state.suppliers.filter(item => item.id !== object.id)
    newSup.push(object)
    this.setState({
      suppliers: newSup
    });
  }

  submitCustomerUpdate=(object)=>{
    const newCust = this.state.customers.filter(item => item.id !== object.id)
    newCust.push(object)
    this.setState({
      customers: newCust
    });
  }

  updateInventory=(object, reason)=>{
    // need to delete items from inventory
    // need to find the oldest item in the database and check the quantitiy.
    let sku = object.sku;
    // DELETE INVENTORY FROM PO
    if (reason === 'customerPO') {
      let idc = this.findMaxId(this.state.past_orders);
      let id = idc + 1;
      let customerObj = {
        id: id,
        user_id: this.state.user_id,
        company: object.company,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        cust_order: object.cust_order,
        sup_order: object.sup_order,
        date_entered: object.date_entered
      };
      // we filter the inventory to the selected sku. 
      let filteredInventory = this.state.inventory.filter(item => item.sku === sku);
      // maybe put it in a queue
      const sortedInventory = filteredInventory.slice().sort((itemA, itemB) => new Date(itemA.date_entered) - new Date(itemB.date_entered));

      if (sortedInventory.length > 0) {
        this.findOldestInventory(object,sortedInventory); 
      }

      // submit the customerPO object to the past orders history
      this.state.past_orders.push(customerObj);
      this.setState({
        past_orders: this.state.past_orders,
      });
    }
    else if (reason === 'supplierPO') {
      // send to database for updating inventory.  
      let ids = this.findMaxId(this.state.inventory);
      let id = ids + 1;
      let supplierObj = {
        id: id,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        inv_location: object.inv_location,
        date_entered: object.date_entered
      };

      let ido = this.findMaxId(this.state.past_orders);
      let iD = ido + 1;
      
      let supObj = {
        id: iD,
        user_id: this.state.user_id,
        company: object.company,
        sku: object.sku,
        quantity: object.quantity,
        inv_description: object.inv_description,
        cust_order: object.cust_order,
        sup_order: object.sup_order,
        date_entered: object.date_entered
      };

      this.state.inventory.push(supplierObj);
      this.state.past_orders.push(supObj);

      this.setState({
        inventory: this.state.inventory,
        past_orders: this.state.past_orders
      });
    }
  }

  findMaxId=(array)=>{
    let max = 0;
    array.forEach(item => {
      if (item.id > max) {
        max = item.id
      }
    });
    return max;
  }

  findOldestInventory=(object, sortedInventory)=>{

    let quantity = 0;
    let invArr = this.state.inventory;
    for (let i=0; i<sortedInventory.length; i++) {
      let qty = sortedInventory[i].quantity
      if (qty > object.quantity) {
        quantity+=qty;
        // at this point send the id and qty to the update function for inventory. (to the database)
        let id = sortedInventory[i].id;
        let diff = quantity-object.quantity;

        let newInv = this.adjustQuantity(invArr, id, diff)

        invArr = newInv
      }
      else if (qty <= object.quantity) {
        quantity+= qty;
        // at this point send the id to delete to the delete function. (to the database)
        let workingArr = invArr;
        invArr = this.deleteInventory(workingArr, sortedInventory[i].id);
      }    
    }
    this.setState({
      inventory: invArr
    });
  }

  adjustQuantity=(inventory,id, diff)=>{
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

    let newInventoryList = 
    inventory.filter(function(el){
      return el.id !== id;
    });

    newInventoryList.push(newItem);
    return newInventoryList;
  }

  deleteInventory=(inventory,id)=> {
    return inventory.filter((el)=>{
      return el.id !== id;
    });
  }

  createNavRoutes() {
    if (this.state.click === true) {
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
  
  createLanding(){
    if (this.state.click === false){
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
      user_id: this.state.user_id
    };
    // console.log(contextValue)
    return (
      <context.Provider value={contextValue}>
        <div className="app">
          <header><h1>Stock'Em!</h1></header>
          <nav role="navigation">
            {this.createNavRoutes()}
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

