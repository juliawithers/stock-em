import React from 'react'

const context = React.createContext({
  handleLoginSubmit: ()=>{},
  inventory: [],
  customers: [],
  suppliers: [],
  past_orders: [],
  skus: [],
  customerId: '',
  supplierId: '',
  user_id: '',
  submitCustomerPO: ()=>{},
  submitSupplierPO: ()=>{},
  submitSupplier: ()=>{},
  submitCustomer: ()=>{},
  submitSKUs: ()=>{}
})

export default context
