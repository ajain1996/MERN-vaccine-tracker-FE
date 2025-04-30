// src/pages/CreateService.jsx
import { useState } from 'react';
import {
    TextField, Button, Container, Typography, Box
} from '@mui/material';
import API from '../../services/api';
import Navbar from '../components/Navbar';

function CreateDoctorService() {
    const [form, setForm] = useState({ title: '', description: '', price: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await API.post('/doctor/services-create', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Service created successfully');
            setForm({ title: '', description: '', price: '' });
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create service');
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h5" mt={4} mb={2}>Create New Service</Typography>
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Service Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Price (₹)"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">Create Service</Button>
                </Box>
            </Container>
        </>
    );
}

export default CreateDoctorService;
