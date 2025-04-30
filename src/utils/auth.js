export const logout = (navigate) => {
    localStorage.removeItem('token'); // clear the token
    navigate('/login'); // redirect to login
};

export const truncateDescription = (text, wordLimit = 16) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
};