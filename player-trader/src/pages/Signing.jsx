import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIng() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      dispatch(signInStart());
      const res = await fetch('/api/auth/signing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
     
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="flex justify-center py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500 text-center">Sign In </h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Password
            </label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          <div className="mt-4">
            <button className="w-full bg-red-500 text-white text-sm font-semibold py-2 rounded-lg
           hover:bg-red-600 transition duration-200 uppercase"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
          <OAuth />
        </form>

        <p className="text-gray-600 text-sm mt-4">
          Do not have an account{' '}
          <Link to="/signup">
            <button href="#" className="text-green-500 ">
              Sign Up
            </button>
            
          </Link>
        </p>
        <p className="text-red-700 mt-5">{error ? error || 'Something went wrong!' : ''}</p>
      </div>
    </div>
  );
}
