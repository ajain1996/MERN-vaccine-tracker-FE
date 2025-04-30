import { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from './components/Navbar';

function Register() {
    const [form, setForm] = useState({ username: '', password: '', role: 'patient' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if(res.data.user.role === 'patient') {
                navigate('/dashboard');
            } else {
                navigate('/doctor/dashboard');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Registration Failed');
        }
    };

    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 20 }}>
                    <Typography variant="h4" align="center" gutterBottom>Register</Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            margin="normal"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        >
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="patient">Patient</MenuItem>
                        </TextField>
                        <Button variant="contained" fullWidth color='warning' type="submit" sx={{ mt: 2 }}>
                            Register
                        </Button>

                        <Button variant="text" onClick={handleLoginClick} sx={{ mt: 2 }}>Existing user? Login</Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Register;
