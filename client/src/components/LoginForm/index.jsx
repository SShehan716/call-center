import React from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { tokens } from "./../../theme";

const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Handle form submission and login logic here

  return (
    <Box sx={{ mt: 5, p: 3}}>
      <Typography variant="h4" color={colors.greenAccent[400]} fontWeight="bold">Login</Typography>

      <TextField label="Email" type="email" variant="outlined" fullWidth sx={{ my: 2 }} />
      <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ my: 2 }} />
      <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ width: '20%' }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
