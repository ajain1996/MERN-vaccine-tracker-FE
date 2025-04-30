import { useNavigate, useParams } from "react-router-dom";
import ChatWindow from "./ChatWindow";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchProfile, fetchUser } from "../../services/api";
import Navbar from "../components/Navbar";

export default function ChatPage() {
    const navigate = useNavigate();
    const { receiverId } = useParams();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [docName, setDocName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchProfile((status, res) => {
            if (status === 0) {
                setName(res.data.username);
                setRole(res.data.role);
            }
            if (status === 1) {
                navigate('/login');
            }
            if (status === 2) {
                setLoading(false);
            }
        });

        fetchUser(receiverId, (status, res) => {
            if(status === 0) {
                setDocName(res?.data?.username)
            }
        })
    }, [navigate, receiverId]);

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
                <Typography variant="h4" gutterBottom>Welcome {name}</Typography>
                <Typography variant="h6" gutterBottom>Chat with {role.toLocaleUpperCase()}: {docName}</Typography>
            </Container>
            <ChatWindow receiverId={receiverId} />
        </div>
    );
}
