import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from './components/Navbar';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if(res.data.user.role === 'patient') {
                navigate('/dashboard');
            } else {
                navigate('/doctor/dashboard');
            }
        } catch (err) {
            alert(err.response.data);
            console.log(err.response.data);
        }
    };

    const handleCreateAccountClick = () => {
        navigate('/register');
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 20 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <Button type="submit" variant="contained" color="warning">
                            Login
                        </Button>

                        <Button variant="text" onClick={handleCreateAccountClick}>New user? Create Account</Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Login;
