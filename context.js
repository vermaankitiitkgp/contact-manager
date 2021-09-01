import React, { Component } from 'react'
import axios from 'axios'
const Context= React.createContext();
const reducer =(state,action) => {
    switch(action.type){
        case 'DELETE_CONTACT' :
            return {
                ...state,
                contacts:state.contacts.filter(contact =>contact.id!==action.payload)
            };
        case 'ADD_CONTACT' :
            return{
                ...state,
                contacts:[action.payload,...state.contacts] // Here we are adding the contact using spread operator
            };
        case 'UPDATE_CONTACT' :
            return{
                ...state,
                contacts: state.contacts.map(contact=> contact.id === action.payload.id ?(contact=action.payload):contact)
            };
            default:
                return state;
            }
    }



export class Provider extends Component {
    state = {
            contacts: [
             /*  we are commenting this out because we want to fetch data from API now {
                    id:1 ,
                    name:'Ananya Kalsotra',
                    email:'ak@gmail.com',
                    phone: '963568738'
                },
                {
                  id: 2,
                  name:'Arin Kalsotra',
                  email:'arin@gmail.com',
                  phone: '2222222222'
              },
              {
                  id:3,
                  name:'Arun Kalsotra',
                  email:'arun@gmail.com',
                  phone: '3333333333'
              },
              {
                  id:4,
                  name:'Puja Kalsotra',
                  email:'puja@gmail.com',
                  phone: '4444444444'
              }*/
            ],
            dispatch : action => this.setState(state =>reducer(state,action))
             
        };
      /*  componentDidMount(){
            axios 
            .get('https://jsonplaceholder.typicode.com/users')
            .then(res=>{
                this.setState({
                    contacts: res.data
                })
            })
        }*/
        async componentDidMount(){
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            this.setState({contacts: res.data});

        }
    
    
    render() {
        return (
            <Context.Provider value={this.state}>
               {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer=Context.Consumer;