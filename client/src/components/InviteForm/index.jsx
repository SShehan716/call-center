import React, { useState } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { tokens } from "./../../theme";

const InviteForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [name, setName] = useState('');
  const [role, setRole] = useState(''); // options: "admin", "user"
  const [email, setEmail] = useState('');

  // Handle form submission and user invite logic here

  return (
    <Box sx={{ mt: 5, p: 3 }}>
      <Typography variant="h4" color={colors.greenAccent[400]} fontWeight="bold">
        Invite User
      </Typography>

      <TextField
        label="Name"
        type="text"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Role"
        type="text"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        sx={{ my: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ width: '20%' }}
        onClick={() => {
          // handle submit and user invite logic with name, role, and email
        }}
      >
        Invite
      </Button>
    </Box>
  );
};

export default InviteForm;
