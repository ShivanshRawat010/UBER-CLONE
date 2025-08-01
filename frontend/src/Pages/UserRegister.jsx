import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';
import Logo from '../../Components/Logo';

const UserRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user,setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      email: email,
      password: password, 
      fullName: {
        firstName: firstName,
        lastName: lastName
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;

      setUser(data.user)

      localStorage.setItem('token', data.token);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className='bg-white flex flex-col items-center justify-between h-screen w-full relative'>
      <div className="absolute top-[5%] left-8 w-[20%] h-10">
        <Logo/>
      </div>
      <div className='pt-32 w-full px-8'>
        <form onSubmit={submitHandler}>
          <h3 className='font-semibold'>What's you name?</h3>
          <div className='flex justify-between gap-x-2 mb-4'>
            <input 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
              type="text" 
              placeholder='First Name'
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              required 
            />
            <input 
              className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
              type="text" 
              placeholder='Last Name' 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)}
              required 
            />
          </div>
          <h3 className='font-semibold'>What's your e-mail address</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2 mb-4' 
            type="email" 
            placeholder='example@example.com' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h3 className='font-semibold'>Enter Password</h3>
          <input 
            className='bg-gray-300 h-10 outline-none px-2 pb-1 rounded-md w-full mt-2' 
            type="password" 
            placeholder='Enter your password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type='submit' 
            className='bg-black text-white w-full h-10 mt-8 mb-2 flex items-center justify-center rounded-md'
          >
            Register User
          </button>
        </form>
        <div className='w-full flex justify-center text-[15px]'>Already hava an account? &nbsp; <Link to='/userLogin' className='text-blue-400'>Login here</Link></div>
      </div>
      <div className='w-full px-8 pb-8 text-[11px] text-gray-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam nemo odio voluptate ipsa deserunt ad asperiores tempore! Quos, aperiam iusto!
      </div>
    </div>
  );
}

export default UserRegister
