import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const InviteForm = () => {

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <Box sx={{ mt: 5, p: 3 }}>
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
                fullWidth
                label="User Role"
                name="UserRole"
                select
                sx={{ gridColumn: "span 2" }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <MenuItem value="Intern">Admin</MenuItem>
                <MenuItem value="Admin">User</MenuItem>
            </TextField>

            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                sx={{ my: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ my: 2 }}
                value={password}
                autoComplete='new-password'
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ width: '20%' }}
            >
                Invite
            </Button>
        </Box>
    );
};

export default InviteForm;
