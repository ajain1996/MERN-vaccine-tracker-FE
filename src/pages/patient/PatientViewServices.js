import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import API from '../../services/api';
import { truncateDescription } from '../../utils/auth';
import BookAppointmentModal from './book/BookAppointmentModal';

function PatientViewServices() {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        fetchMyServices();
    }, []);

    const fetchMyServices = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get('/patient/all-services', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const bookAppointment = (doctorId, serviceId) => {
        setSelectedDoctorId(doctorId);
        setSelectedServiceId(serviceId);
        setOpen(true);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" mb={3}>Available Services</Typography>
                <Grid container spacing={2}>
                    {services.map((service) => (
                        <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }} key={service._id}>
                            <Card style={{ height: "150px" }}>
                                <CardContent>
                                    <Typography variant="h6">{service.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {truncateDescription(service.description, 28)}
                                    </Typography>

                                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Provided by: {service.doctor?.username}
                                        </Typography>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color='warning'
                                            onClick={() => bookAppointment(service.doctor._id, service._id)}
                                        >
                                            Book Appointment
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <BookAppointmentModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    doctorId={selectedDoctorId}
                    serviceId={selectedServiceId}
                />
            </Box>
        </>
    );
}

export default PatientViewServices;
