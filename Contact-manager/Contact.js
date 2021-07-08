import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'
import {Link} from 'react-router-dom'


class Contact extends Component {
    state = {
        showContactInfo : false
    };
    /*async componentDidMount(){
        const { id } = this.props.match.params;
        const res= await axios.get(`https://jsonplaceholder.typicode.com/users`);
        const contact = res.data;
        this.setState({
            name: contact.name,
            phone: contact.phone,
            email: contact.email
        });
    }*/
   /* onDeleteClick=(id, dispatch)=>{
       axios
       .delete(
           `https://jsonplaceholder.typicode.com/users/${id}`
       )
       .then(res=> dispatch({type:'DELETE_CONTACT', payload:id}));

        //dispatch({type:'DELETE_CONTACT', payload:id});
    }*/

    onDeleteClick= async (id, dispatch)=>{
       await axios //here we are not doing like const res= await axios because we are not returning anything 
        .delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
        )
        dispatch({type:'DELETE_CONTACT', payload:id})
 
         //dispatch({type:'DELETE_CONTACT', payload:id});
     }


    onShowClick = e => {
        this.setState({showContactInfo: !this.state.showContactInfo})
    }

   
    
    render() {
        const {id, name,email,phone} = this.props.contact ; // Here the state is in Contacts.js but we are passing these four things as props to contact
        const {showContactInfo} = this.state;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                  return ( <div className="card card-body mb-3 ">
                  <h3 style={{color: 'black', fontSize: '30px', marginLeft:'20px'}}>{name}{' '}<i
                   onClick={this.onShowClick} className="fas fa-sort-down"
                   style={{cursor: 'pointer'}} /> 
                   <i className="fas fa-times" style={{cursor:'pointer',float:'right',color:'red'}}
                   onClick={this.onDeleteClick.bind(this,id,dispatch)} /> 
                   <Link to={`/contact/edit/${id}`}>
                   <i className="fas fa-pencil-alt" style={{cursor:'pointer',float:'right',marginRight:'1rem', color:'black'}} />
                   </Link>
                   </h3>
                  
  {showContactInfo ? <u1 className="list-group">
                      <li className="list-group-item" style={{fontFamily: 'Arial,Helvetica,Sans-serif'}}>Email: {email}</li>
                      <li className="list-group-item">Contact: {phone}</li>
                  </u1> : null }
                  
              </div>) ;

                }

                }

            </Consumer>
           
        );
    }
}
Contact.propTypes= {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
}
export default Contact;

