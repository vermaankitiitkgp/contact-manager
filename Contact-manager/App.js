import React, { Component } from 'react'
import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Contacts from './Components/contacts/Contacts'
import Header from './Components/Layout/Header'
import About from './Components/pages/About'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from './context'
import AddContact from './Components/contacts/AddContact';
import NotFound from './Components/pages/NotFound';
import Test from './Components/test/Test';
import EditContact from './Components/contacts/EditContact';

function App() {
  return (
    <Provider>
      <Router>
    <div className="App">
      
     
     <Header branding="CONTACT MANAGER"/>
    <div className="container"> 
    <Switch>
      <Route exact path="/" component= {Contacts} />
      <Route exact path="/contact/add" component= {AddContact} />
      <Route exact path="/contact/edit/:id" component= {EditContact} />
      <Route exact path="/about" component= {About} />
      
      <Route component={NotFound}/>
       
      </Switch> 
    </div>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
