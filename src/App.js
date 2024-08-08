import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/LoginAndRegisterPages/LoginPage/Login';
import Register from './Pages/LoginAndRegisterPages/RegisterPage/Register';
import ForgetPassword from './Pages/LoginAndRegisterPages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/LoginAndRegisterPages/ForgetPassword/ResetPassword';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} index/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forget-password' element={<ForgetPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}