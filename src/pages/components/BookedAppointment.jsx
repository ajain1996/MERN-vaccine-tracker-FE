/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

function BookedAppointment({ appointment }) {
    const navigate = useNavigate();
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [userData, setUserData] = useState(null);

    const doctorId = appointment?.doctor?._id;
    const appointmentId = appointment?._id;
    const appointmentDate = appointment?.appointmentDate;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setUserData(user);

                const token = localStorage.getItem('token');
                const res = await API.get('/patient/my-doctor', {
                    params: { doctorId },
                    headers: { Authorization: `Bearer ${token}` }
                });

                setDoctorInfo(res.data);
            } catch (err) {
                console.error("Error loading doctor or user info", err);
            }
        };

        if (doctorId) fetchData();
    }, [doctorId]);

    const handleChatClick = () => {
        if (userData?._id) {
            navigate(`/chat/${doctorId}`);
        }
    };

    const cancelAppointment = () => {
        // Cancel logic here
    };

    return (
        <Grid item xs={12} sx={{ mt: 2 }} key={appointmentId}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                Appointment Date: {appointmentDate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                Doctor Name: {doctorInfo?.username || 'Loading...'}
                            </Typography>
                        </Box>
                        <Button
                            variant="text"
                            size="small"
                            color="secondary"
                            onClick={handleChatClick}
                        >
                            Chat
                        </Button>
                    </Box>

                    <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={cancelAppointment}
                        sx={{ mt: 2 }}
                    >
                        Cancel Appointment
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default memo(BookedAppointment);
