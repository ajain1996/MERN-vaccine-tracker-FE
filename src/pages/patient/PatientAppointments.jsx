import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import Navbar from '../components/Navbar';

const options = [
    { title: 'Book COVID-19 Vaccine', description: 'Schedule your COVID-19 vaccination.' },
    { title: 'Opt for Medicines', description: 'Request prescribed medicines easily.' },
    { title: 'Book Health Services', description: 'Book doctor consultation or healthcare services.' },
];

function PatientAppointments() {
    return (
        <>
            <Navbar />
            <Container sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Available Options
                </Typography>
                <Grid container spacing={4}>
                    {options.map((option, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{option.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {option.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained">Book Now</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default PatientAppointments;
