import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }

      navigate('/signing');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-center font-semibold mb-4 text-gray-500">Sign Up</h2>

        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border rounded-lg" onChange={handleChange} />
          </div>

          
          <div className="mt-4">
            <button className="w-full bg-red-500 text-white text-sm font-semibold py-2 rounded-lg
             hover:bg-red-600 transition duration-200 uppercase">
             {loading ? 'Loading...' : 'Sign Up'}
             </button>
          </div>
          <hr className="mt-5 border-gray-300" />

          <OAuth />
        </form>

        <p className="text-gray-600 text-sm mt-4">
          Have an account{' '}
          <Link to="/signing">
            <button href="#" className="text-green-500">
            Sign in
            </button>
          </Link>
        </p>
        <p className="text-red-700 mt-5">{error && 'Password does not match!'}</p>
      </div>
    </div>
  );
}
