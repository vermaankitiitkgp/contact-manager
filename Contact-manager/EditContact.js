import React, { Component } from 'react'
import { Consumer } from '../../context';
/*import uuid from 'uuid';*/
import TextInputGroup from './TextInputGroup';
import axios from 'axios';

class EditContact extends Component {

    state={
        name:'',
        email:'',
        phone:'',
        errors:{}
    };
    async componentDidMount(){
        const {id} = this.props.match.params;
        const res= await axios.
        get(`https://jsonplaceholder.typicode.com/users/${id}`)
        const contact=res.data;
        this.setState({
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        })
    }
    
    onSubmit =async (dispatch,e) =>
    {
        e.preventDefault();
        const {email,name,phone} = this.state;
        if(name==='')
        {
            this.setState({errors:{name:'Name is required'}});
            return;
        }
        if(email==='')
        {
            this.setState({errors:{email:'email is required'}});
            return;
        }
        if(phone==='')
        {
            this.setState({errors:{phone:'phone is required'}});
            return;
        }
        /*if(name==='' || email==='' || phone ==='')
        {
            this.setState({errors:{name:'Name is required',
            email:'email is required',
            phone:'phone is required'
        }})
        return;
        }*/
        const updContact={
            name,
            phone,
            email
        }
        const {id} = this.props.match.params;
        const res = await axios.
        put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);
        dispatch({type:'UPDATE_CONTACT',payload:res.data});

        
        this.setState({
            name:'',
            phone:'',
            email:'',
            errors:{}
        })
        this.props.history.push('/'); //redirection this will redirect us to main page '/' after submission 
    };
    onNameChange = (e)=> this.setState({name:e.target.value})
    onPhoneChange = (e)=> this.setState({phone:e.target.value})
    onEmailChange = (e)=> this.setState({email:e.target.value})
    
    render() {
        const {email,name,phone,errors} = this.state;
        return(
            <Consumer>
            {value => {
                const {dispatch} = value;
                return(<div className="card mb-3">
                <div className="card-Header" style={{padding:'20px'}}>Update Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                       
                       <TextInputGroup
                        label="Name"
                        placeholder="Enter name "
                        value={name}
                        name="Name"
                        onChange={this.onNameChange}
                        error={errors.name}
                        
                        />
                       <TextInputGroup
                        label="Email"
                        placeholder="Enter Email "
                        value={email}
                        name="Email"
                        onChange={this.onEmailChange}
                        type="email"
                        error={errors.email}
                        
                        />
                        <TextInputGroup
                        label="Phone"
                        placeholder="Enter Phone "
                        value={phone}
                        name="Phone"
                        onChange={this.onPhoneChange}
                        error={errors.phone}
    
                        />
                        <input type="submit"
                        value="Update Contact"
                        className="btn btn-light btn-black"
                        
                        />
                    </form>
                </div>

               
            </div>

                )
            }}


            </Consumer>
        )
       
    }
}
export default EditContact; 