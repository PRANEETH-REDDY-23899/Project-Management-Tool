import React , {useState,useEffect} from 'react'
import {Form, Button, InputGroup} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, redirect } from "react-router-dom";
import Login from './Login';
import axios from 'axios';

function SignUp() {


    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repassword, setRepassword] = React.useState("");
    const [userexists, setUserexists] = React.useState(false); // this is a boolean value
    const [showPassword, setShowPassword] = React.useState(false);


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleCheckUsername = () => {
      // Make a POST request to check if the username exists
      axios
        .post('/checkUsername', { username })
        .then((response) => {
          if (response.data.userExists) {
            window.alert('User with this username already exists. Please choose another username.');
          } else {
            window.alert('Username is available.');
          }
        })
        .catch((error) => {
          console.error(error);
          window.alert('Error checking username.');
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // clear form data once this bottom is pressed

        // check if the password and re-enter password are same or not
        // set values 
        // send it as a json 
        const data = {firstname, lastname, username, password, repassword};

        if (password !== repassword){
            alert('Passwords do not match');
            return;
        }

        if(!firstname || !lastname || !username || !password || !repassword){
          alert('Please fill all the fields');
          return;
        }

     

        // console.log(data);
        axios.post('http://localhost:5000/userCreation', data)
        .then(res =>{

          if(res.data === 'User already exists')
          {
           setUserexists(true);
          }
        } 
          
          )
        .catch(err => console.log(err));


          if (userexists === false)
          {
            alert('User Created Successfully');
            redirect: window.location.href = '/login';
          }

          else
          {
            alert('User already exists');
          }


          setFirstname('');
          setLastname('');
          setUsername('');
          setPassword('');
          setRepassword('');
          setUserexists(false);


    }


   




  return (
    <div className= "form">

    <img src="https://www.albany.edu/sites/default/files/Primary_Split_A_2020_RGB_0.png" alt="ualbany_logo" height={35} />

    <h4 className='mt-3'>Sign Up</h4>

    <Form onSubmit={handleSignup}>
    <Form.Group className="mb-2 mt-3" controlId="firstname">
        <Form.Label >First Name</Form.Label>
        <Form.Control type="firstname" onChange={(e) => setFirstname(e.target.value)}
        placeholder="Enter your first name" />
   </Form.Group>

     <Form.Group className="mb-2 mt-3" controlId="lastname">
        <Form.Label >Last name</Form.Label>
        <Form.Control type="lastname" onChange={(e) => setLastname(e.target.value)}
        placeholder="Enter your last name" />
   </Form.Group>      

    <Form.Group className="mb-2 mt-3" controlId="username">
        <Form.Label >User Name</Form.Label>
        <Form.Control type="username" onChange={(e) => setUsername(e.target.value) }
        placeholder="Enter your username" />

    

    </Form.Group>

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




    {/* <Form.Group className="mb-2">
    <InputGroup>
        <Form.Label>Password</Form.Label >
        <Form.Control  type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" />

        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}  </Button>
        </InputGroup> 
    </Form.Group> */}



<Form.Group className="mb-2">
        <Form.Label>Re-type Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={repassword}
            onChange={(e)=>setRepassword(e.target.value)}
            
          />

            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
        </InputGroup>
      </Form.Group>






    {/* re-enter password */}
    {/* <Form.Group className="mb-2" controlId="formBasicPassword" >

        <Form.Label>Re-enter Password</Form.Label >
        <Form.Control  type="password"  onChange={(e) => setRepassword(e.target.value)}
        placeholder="Password" />
    </Form.Group> */}

    <Button variant="primary" type="submit"  className="mb-2 mt-2 login_button" onClick={handleSignup}> Sign Up </Button>

    <p> Already Have an account <Link to="/login">Login</Link></p>


    {/* for first name*/}

    </Form>

    </div>


  )
}

export default SignUp