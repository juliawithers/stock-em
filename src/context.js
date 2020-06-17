import React from 'react'

const context = React.createContext({
  handleLoginSubmit: ()=>{},
  getCharacter: ()=>{},
  getCharacterList: ()=>{},
  createNewOpponent: ()=>{},
  deleteCharacter:()=>{},
  deleteUser:()=>{},
  createCharacter: ()=>{},
  inventory: [],
  customers: [],
  suppliers: [],
  past_orders: [],
  submitCustomerPO: ()=>{},
})

export default context
