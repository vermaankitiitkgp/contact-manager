
import React, { Component } from 'react'
import { Consumer } from '../../context';
/*import uuid from 'uuid';*/
import TextInputGroup from './TextInputGroup';
import axios from 'axios';

class AddContact extends Component {

    state={
        name:'',
        email:'',
        phone:'',
        errors:{}
    };
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
        

        const newContact ={
           /* id : uuid(),*/ // when we attach our application with context API we donot need to generate id, it gets self generated 
            name, // when we have name: name then we can do just name,
            phone,
            email
        }
        /* axios
        .post('https://jsonplaceholder.typicode.com/users', newContact)
        .then(res=>{dispatch({type:'ADD_CONTACT', payload: res.data})})*/

        /*dispatch({type:'ADD_CONTACT', payload: newContact});*/
        const res = await axios
        .post('https://jsonplaceholder.typicode.com/users', newContact);
        dispatch({type:'ADD_CONTACT', payload: res.data});
        this.setState({
            name:'',
            phone:'',
            email:'',
            errors:{}
        })
        this.props.history.push('/');
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
                <div className="card-Header" style={{padding:'20px'}}>Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                       
                       <TextInputGroup
                        label="Name"
                        placeholder="Enter name "
                        value={name}
                        name="Name"
                        onChange={this.onNameChange}
                       // error={errors.name}
                        required
                        
                        />
                       <TextInputGroup
                        label="Email"
                        placeholder="Enter Email "
                        value={email}
                        name="Email"
                        onChange={this.onEmailChange}
                        type="email"
                        //error={errors.email}
                        required
                        
                        />
                        <TextInputGroup
                        label="Phone"
                        placeholder="Enter Phone "
                        value={phone}
                        name="Phone"
                        onChange={this.onPhoneChange}
                      //  error={errors.phone}
                        required
    
                        />
                        <input type="submit"
                        value="Add Contact"
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
export default AddContact; 
