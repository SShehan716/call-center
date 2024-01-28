import React from 'react';
import LoginForm from '../../components/LoginForm';
import { Typography } from '@mui/material';

const Login = () => {
  return (
    <div className="login-container">
      <div className="left-content">
        <Typography variant="h1" color="secondary" fontWeight="bold" align='left' ml={12}>Welcome to the Call Center Web app!</Typography>
      </div>
      <div className="right-content">
        <main>
          <LoginForm />
        </main>
      </div>
    </div>
  );
}

export default Login;
