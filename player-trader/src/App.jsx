import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signing from './pages/Signing';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';




function App() {
  return (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/signing" element={<Signing />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={<Home />} />
      
      <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

    </Routes>
  </BrowserRouter>
  );
}

export default App;