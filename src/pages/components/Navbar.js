/* eslint-disable react-hooks/exhaustive-deps */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { memo, useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");
    const [userData, setUserData] = useState({});

    const handleNavigation = (path) => navigate(path);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout(navigate);
        }
    };

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            setUserData(storedUser);
        } catch (err) {
            console.error("Failed to parse user data", err);
        }
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="warning">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Vaccine Tracker
                    </Typography>
                    <Button color="inherit" onClick={() => handleNavigation("/")}>Home</Button>

                    {isAuthenticated ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() =>
                                    handleNavigation(userData?.role === "doctor" ? "/doctor/dashboard" : "/dashboard")
                                }
                            >
                                Dashboard
                            </Button>
                            <Button color="inherit" onClick={() => handleNavigation("/all-chats")}>
                                Chat
                            </Button>
                            {userData?.role === 'patient' && (
                                <Button color="inherit" onClick={() => handleNavigation("/patient/all-services")}>
                                    All Services
                                </Button>
                            )}
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => handleNavigation("/login")}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => handleNavigation("/register")}>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default memo(Navbar);
