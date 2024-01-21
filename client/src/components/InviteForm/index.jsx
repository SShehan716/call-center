import React from "react";
import { Box, TextField, Button } from "@mui/material";

const InviteForm = () => {
    // Handle form submission and login logic here
    
    return (
        <Box sx={{ mt: 5, p: 3 }}>
        <TextField label="Username" variant="outlined" fullWidth />
        <TextField label="Password" type="password" variant="outlined" fullWidth />
        <Button type="submit" variant="contained" fullWidth>
            Invite
        </Button>
        </Box>
    );
    }

export default InviteForm;