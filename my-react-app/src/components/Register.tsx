import React, { useState } from 'react';
import './Registration.css';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const Registration: React.FC = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
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
    const {data}= await axios.post("http://localhost:5000/api/user",{
        ...inputValue,
    },
)
    if(data){
       alert("Register successfull")
       setInputValue({
        username: '',
        email: '',
        password: ''
       })
    }
    else{
        alert("Register failed")
    }
  }

  return (
    <div className="container">
      <div className="registration">
        <h3 className='text-center heading'>Registration</h3>

        <TextField
          id="outlined-name"
          name="username"
          label="Name"
          variant="outlined"
          value={inputValue.username}
          onChange={handleChange}
        />
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
        <p className=''>Already have an account <a href='/login'>?Login</a></p>
        
      </div>
    </div>
  );
};

export default Registration;
