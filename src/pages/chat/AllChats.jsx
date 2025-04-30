/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Badge, Container, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API, { fetchProfile } from '../../services/api';
import Navbar from '../components/Navbar';

const AllChats = () => {
    const [chats, setChats] = useState([]);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await API.get('/chat/',
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setChats(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Something went wrong', error)
            }
        };

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

        fetchChats();
    }, []);

    const handleChatClick = (receiverId) => {
        navigate(`/chat/${receiverId}`);
    };

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 40 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h4" gutterBottom>Welcome {name} chat with ({role.toUpperCase()})</Typography>
            </Container>
            <List sx={{padding: 6}}>
                {chats.map(({ _id, lastMessage, unreadCount }) => {
                    return(
                        <Paper
                            key={_id}
                            elevation={unreadCount > 0 ? 4 : 1} // More elevation if unread
                            sx={{ marginBottom: 2, cursor: 'pointer' }}
                            onClick={() => handleChatClick(_id)}
                        >
                            <ListItem
                                button
                                key={_id}
                                onClick={() => handleChatClick(_id)}
                            >
                                <ListItemText
                                    primary={`Chat with ${lastMessage.sender.username === _id ? lastMessage.receiver.username : lastMessage.sender.username}`}
                                    secondary={lastMessage.content}
                                />
                                {unreadCount > 0 && (
                                    <Badge color="secondary" badgeContent={unreadCount} />
                                )}
                            </ListItem>
                        </Paper>
                    )
                })}
            </List>
        </div>
    );
};

export default AllChats;
