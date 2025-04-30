import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import API, { fetchProfile } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { truncateDescription } from '../../utils/auth';

function DoctorDashboard() {
    const navigate = useNavigate();
    const [myServices, setMyServices] = useState([]);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        fetchProfile((status, res) => {
            if (status === 0) {
                setRole(res.data.role);
                setName(res.data.username);
            }
            if (status === 1) {
                navigate('/login');
            }
        });

        fetchMyServices();
    }, [navigate]);

    const fetchMyServices = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get('/doctor/services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMyServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteService = async (serviceId) => {
        try {
            const token = localStorage.getItem('token');
            await API.delete(`/services/${serviceId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Service deleted!');
            fetchMyServices(); // Refresh list
        } catch (err) {
            console.error(err);
            alert('Error deleting service');
        }
    };

    const handleCreateService = () => {
        navigate('/doctor/create-service')
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>Welcome {name} ({role.toUpperCase()})</Typography>
            </Container>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={9}>
                        <Typography variant="h4" mb={3}>My Added Services</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Button
                            variant="outlined"
                            size="large"
                            color="warning"
                            onClick={handleCreateService}
                        >
                            Create New Service
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {myServices.map((service) => (
                        <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={service._id}>
                            <Card style={{ height: "150px" }}>
                                <CardContent>
                                    <Typography variant="h6">{service.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {truncateDescription(service.description, 28)}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        sx={{ mt: 2 }}
                                        onClick={() => deleteService(service._id)}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default DoctorDashboard;
