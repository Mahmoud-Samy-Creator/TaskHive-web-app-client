import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import Application main components
import Login from '../Pages/LoginAndRegisterPages/LoginPage/Login';
import Register from '../Pages/LoginAndRegisterPages/RegisterPage/Register';
import ForgetPassword from '../Pages/LoginAndRegisterPages/ForgetAndResetPassword/ForgetPassword';
import ResetPassword from '../Pages/LoginAndRegisterPages/ForgetAndResetPassword/ResetPassword';
import Home from '../Pages/HomePage/Home/Home';

  // Gathering token from user storage
  const storedTokenLoacal = localStorage.getItem('authToken');
  const storedTokenSession = sessionStorage.getItem('authToken');

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (storedTokenLoacal) {
      setToken(storedTokenLoacal);
    }
    if (storedTokenSession) {
      setToken(storedTokenSession);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
      <Routes>
        <Route path="/auth/*" element={token ? <Navigate to="/home" replace /> : <AuthRoutes />} />
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <Navigate to="/auth/login" replace />}
        />
        <Route path="/forget-password" element={token ? <Navigate to="/home" replace />  : <ForgetPassword />} />
        <Route path="/reset-password" element={token ? <Navigate to="/home" replace />  : <ResetPassword />} />
        <Route path="/home/*" element={token ? <Home /> : <Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
export {storedTokenLoacal, storedTokenSession}