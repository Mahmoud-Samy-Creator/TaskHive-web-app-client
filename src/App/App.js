import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/LoginAndRegisterPages/LoginPage/Login';
import Register from '../Pages/LoginAndRegisterPages/RegisterPage/Register';
import ForgetPassword from '../Pages/LoginAndRegisterPages/ForgetAndResetPassword/ForgetPassword';
import ResetPassword from '../Pages/LoginAndRegisterPages/ForgetAndResetPassword/ResetPassword';
import Home from '../Pages/HomePage/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/auth/*'>
          <Route path='login' element={<Login />} index/>
          <Route path='register' element={<Register />}/>
        </Route>
        <Route path="/" element={<Navigate to="/home/" />} />
        <Route path='/forget-password' element={<ForgetPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/home/*' element={<Home />} />
      </Routes>
    </Router>
  );
}