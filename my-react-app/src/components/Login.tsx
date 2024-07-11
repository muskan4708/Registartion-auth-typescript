import React, { useState } from 'react';
import './Registration.css';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };
  const  handleSubmit=async (e:any)=>{

    console.log(inputValue);
    e.preventDefault()
    const response= await axios.post("http://localhost:5000/api/user/login",{
        ...inputValue,
    },
)
    if(response.data.token){
       alert("login successfull")
       localStorage.setItem('token', response.data.token);
       setInputValue({
        email: '',
        password: ''
       })
    }
    else{
        alert("login failed")
    }
  }

  return (
    <div className="container">
      <div className="registration">
        <h3 className='text-center heading'>Login</h3>
        <TextField
          id="outlined-email"
          name="email"
          label="Email"
          variant="outlined"
          value={inputValue.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={inputValue.password}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Click Me
        </Button>
        <p>Register<a href="/fgPassword">?forget password</a></p>
      </div>
    </div>
  );
};

export default Login;
