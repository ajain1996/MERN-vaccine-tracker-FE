/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';
import API from '../../services/api';
import { Box, Button, Container, TextField } from '@mui/material';

const ChatWindow = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUserId(user?._id);
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await API.get(`/chat/${receiverId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [receiverId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const token = localStorage.getItem('token');
        const res = await API.post('/chat/send', {
            receiverId,
            content: input
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setMessages(prev => [...prev, res.data]);
        setInput('');
    };

    return (
        <Container maxWidth="lg" sx={{ padding: 6 }}>
            <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
                    {messages.map(msg => (
                        <MessageBubble
                            key={msg._id}
                            message={msg}
                            isOwn={msg.sender === currentUserId}
                        />
                    ))}
                </div>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Enter message"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="warning" size='large'>
                        Send
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default memo(ChatWindow);
