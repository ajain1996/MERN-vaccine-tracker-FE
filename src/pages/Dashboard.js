import { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import API, { fetchProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookedAppointment from './components/BookedAppointment';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [bookedAppointments, setBookedAppointments] = useState([]);

    const navigate = useNavigate();

    const handleDoctorPage = () => {
        navigate('/doctor/services');
    };

    const handleAppointentsPage = () => {
        navigate('/patient/all-services');
    };

    const fetchMyBookedAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get('/patient/all-booked-appointments', {
                headers: { Authorization: `Bearer ${token}` },

            });
            setBookedAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchProfile((status, res) => {
            if (status === 0) {
                setRole(res.data.role);
                setName(res.data.username);
            }
            if (status === 1) {
                navigate('/login');
            }
            if (status === 2) {
                setLoading(false);
            }
        });

        fetchMyBookedAppointments();
    }, [navigate]);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 40 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>Welcome {name} ({role.toUpperCase()})</Typography>
            </Container>
            <Container>
                {role === 'doctor' ? (
                    <>
                        <Typography variant="h6" gutterBottom>Manage your Vaccines, Medicines and Services</Typography>
                        <Button variant="contained" onClick={handleDoctorPage}>
                            Go to Services
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>Book Vaccines, Medicines and Services</Typography>
                        <Button variant="contained" onClick={handleAppointentsPage}>
                            Book Appointments
                        </Button>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>See all your booked appointments</Typography>
                        {bookedAppointments.map((appointment) => (
                            <BookedAppointment appointment={appointment} key={appointment._id} />
                        ))}
                    </>
                )}
            </Container>
        </>
    );
}

export default Dashboard;
