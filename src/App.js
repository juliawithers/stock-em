import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import HandleApp from './HandleApp/HandleApp';
import context from './context'
import config from './config'



class App extends Component {
  static contextType = context;
  constructor(props){
    super(props);
    this.state = {
      something: []
    }
  }
  // on submit this should route to HandleApp.
  // HandleApp will show the inventory page and include navlinks to all other pages.

  createRoute() {
    return(
      <>
        <Route
          exact
          path="/welcome"
          component={HandleApp}/>
      </>
    )
  }

  render(){
    return (
        <div className="App">
          <h1>Landing Page</h1>
          <section>
            {/* we have a landing page that explains the app and links to the page. no nav on this landing page */}
            <p>This app is intendend to help users track their inventory, place orders for customers, and place orders to
                suppliers to inflate inventory when it is low</p>
            <p>Please use the link below to enter the inventory site for SomeCompany Inc.</p>
          </section>
          <button class="enter-button"><Link to='/welcome'>Enter</Link></button>
        </div>  
    );  
  }
}

export default App;
