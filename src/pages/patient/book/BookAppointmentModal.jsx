import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Stack,
  Typography
} from '@mui/material';
import API from '../../../services/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BookAppointmentModal = ({ open, handleClose, doctorId, serviceId }) => {
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleBook = async () => {
    try {
      const token = localStorage.getItem('token');
      await API.post('/patient/book-appointments', 
        { doctorId, serviceId, appointmentDate },
        { headers: { Authorization: `Bearer ${token}`}},
      );

      alert('Appointment booked successfully!');
      handleClose();
    } catch (error) {
      console.log('Booking error:', error.response?.data || error.message);
      alert('Failed to book appointment');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Book Appointment</Typography>
        <Stack spacing={2}>
          <TextField
            type="datetime-local"
            label="Appointment Date & Time"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleBook}>
            Confirm Booking
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BookAppointmentModal;
