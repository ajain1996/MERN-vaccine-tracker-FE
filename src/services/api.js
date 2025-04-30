import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchProfile = async (callback) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API_URL + '/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        callback(0, res);
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        callback(1, error);
    } finally {
        callback(2)
    }
};

export const fetchUser = async (userId, callback) => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(API_URL + '/auth/user/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: { userId },
        });
        callback(0, res);
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        callback(1, error);
    }
};

export const fetchVaccines = async (setVaccines) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(API_URL + '/vaccines', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setVaccines(response.data)
    } catch (error) {
        console.error("Error from backend:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Something went wrong!");
    }
};

export const addVaccine = async (vaccineName, date, setVaccines) => {
    
    try {
        const token = localStorage.getItem('token');

        await API.post('/vaccines',
            { vaccineName, date },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchVaccines(setVaccines);

    } catch (error) {
        console.error("Error from backend:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Something went wrong!");
    }
};

export default API;
