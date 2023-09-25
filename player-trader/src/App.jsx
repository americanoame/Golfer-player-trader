import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signing from './pages/Signing';
import Signup from './pages/Signup';
import Home from './pages/Home'



function App() {
  return (
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/signing" element={<Signing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;