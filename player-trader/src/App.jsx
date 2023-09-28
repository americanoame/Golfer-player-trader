import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signing from './pages/Signing';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/signing" element={<Signing />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

    </Routes>
  </BrowserRouter>
  );
}

export default App;