import React from 'react'
import {Form, Button , InputGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, useNavigate} from "react-router-dom";
import SignUp from './SignUp';
import "./Login.css"
import axios from 'axios';
import Home from './Home';
import { useState } from 'react';
import { useAuth } from './components/AuthContext';




function Login() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const[remember, setRemember] = React.useState(false); // this is a boolean value
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handleLogin = (e) => {
        e.preventDefault();
        // set values
        // send it as a json
        const data = {username, password};
        // console.log(data);

        axios.get('http://localhost:5000/checkUser', {params:data})
        .then((res)=>{
            if(res.data){
                alert('User Authenticated');

                // store the user in local storage
                // user = res.data;
                // console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                login(res.data);
               
                navigate('/', {state: {username: username}});

                //use history hook to navigate to the home page with the username as a parameter
            
            }
            else 
                alert('Login failed');

                })        
        .catch(err => alert('Login failed'));
        //  send this data to the backend and connect to a mongoDB database and check if the username and password exists in the database

        // set the form data to empty

        // fetch the data from sign up page which is stored in the browser cache and decide whether to login or not
    }

  return (
    <div className= "form">

        {/* i want to diplay image from images folder and the image name is ualbany_logo */}
        <img src="https://www.albany.edu/sites/default/files/Primary_Split_A_2020_RGB_0.png" alt="ualbany_logo" height={35} />
        <h4 className="mt-3">Login</h4>
        <Form action='POST'>
        

        <Form.Group className="mb-2 mt-3" controlId="username">
            <Form.Label >User Name</Form.Label>
            <Form.Control type="username"
            placeholder="Enter username"  onChange={(e) => setUsername(e.target.value)}/>

            <Form.Text  className="text-muted">
            
            </Form.Text>

        </Form.Group>



    {/* I should show the password show icon as well in the form group */}

    <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            
          />

            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
        </InputGroup>
      </Form.Group>



        {/* <Form.Group className="mb-2" controlId="formBasicPassword" >
            <Form.Label>Password</Form.Label  >
            <Form.Control  type="password" 
            placeholder="Password"   onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group> */}


        <Form.Group className="mb-2" controlId="formBasicCheckbox">
            <Form.Check className="mb-2" type="checkbox"
            label="Remember me" onClick={(e)=>{!remember?setRemember(true):setRemember(false)}}/>

            {/* conditional rendering for onClick remember me */}

        </Form.Group>



        <Button variant="primary" type="submit"  className="mb-2 mt-2 login_button" onClick={handleLogin}> Login
            </Button>

            {/* I want to have a Signup text which  navigates to the SignUp page */} 
        <p> Don't have an Account  <Link to="/SignUp" >Sign Up</Link></p>
        </Form>

        {/* Display current user name */}

        {/* <p> Current User: {username} </p> */}

       
    </div>
  )
}

export default Login