import React from 'react';
import InviteForm from '../../components/InviteForm';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const Login = () => {
    return (
        <Box m="20px">
            <Header title="Invite User" subTitle="Enter User Details" />
            <InviteForm />
        </Box>
    );
}

export default Login;
