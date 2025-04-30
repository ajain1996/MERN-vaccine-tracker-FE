import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import PatientAppointments from './pages/patient/PatientAppointments';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import CreateDoctorService from './pages/doctor/CreateDoctorService';
import PatientViewServices from './pages/patient/PatientViewServices';
import ChatPage from './pages/chat/ChatPage';
import AllChats from './pages/chat/AllChats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route Example */}
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />

        {/* Normal accessible routes */}
        <Route path="/" element={
          <Home />
        } />
        <Route path="/dashboard" element={
          <PublicRoute allowedRoles={['patient']}>
            <Dashboard />
          </PublicRoute>
        } />
        <Route path="/doctor/dashboard" element={
          <PublicRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </PublicRoute>
        } />
        <Route path="/patient/appointments" element={
          <PublicRoute allowedRoles={['patient']}>
            <PatientAppointments />
          </PublicRoute>
        } />
        <Route path="/doctor/create-service" element={
          <PublicRoute allowedRoles={['doctor']}>
            <CreateDoctorService />
          </PublicRoute>
        } />
        <Route path="/patient/all-services" element={
          <PublicRoute allowedRoles={['patient']}>
            <PatientViewServices />
          </PublicRoute>
        } />
        <Route
          path="/chat/:receiverId"
          element={
            <PublicRoute allowedRoles={['doctor', 'patient']}>
              <ChatPage />
            </PublicRoute>
          }
        />
        <Route path="/all-chats" element={
          <PublicRoute allowedRoles={['doctor', 'patient']}>
            <AllChats />
          </PublicRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
