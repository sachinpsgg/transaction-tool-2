import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui-elements/Input';
import { EyeIcon, TransactionIcon } from '../helpers/Icons';
import Checkbox from '../components/ui-elements/Checkbox';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'demouser') {
      setAuth(true);
      localStorage.setItem('username', username);
      navigate('/dashboard/claims');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around space-y-8 p-4 h-screen font-lato">
      <div className="flex justify-center">
        <img
          src={require('../assets/img_2.png')}
          width="500"
          height="500"
          alt="Illustration of a person logging into a computer"
          className=" object-contain"
        />
      </div>

      <div className="bg-white px-5 py-7 rounded-lg w-full max-w-md border shadow-custom border-purple_primary">
        <div className="flex items-center space-x-2 mb-6">
          <TransactionIcon w="37" h="34" />
          <span className="ml-2 leading-5 text-[#6E39CB] font-bold text-[16.5px]">
            TRANSACTION <br /> MANAGER
          </span>
        </div>
        <h2 className="text-2xl font-bold mt-4 mb-2 text-primary">Login to Account</h2>
        <p className="text-secondary mb-6">Please enter your username and password to continue</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <Input
              className="text-secondary"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Input
                className="pr-12"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                <EyeIcon color="#263D50" />
              </div>
            </div>
          </div>
          <Checkbox />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
