import { useState } from 'react';
import { forgotPassword } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { loading, error, message } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
       dispatch(forgotPassword(email));
      
      
    } catch (error) {
      
      console.log('Error:', error);
    }
  };

  const handleClick = () => {
    if (email.trim() === '') {
        console.log('Email is empty. Please enter your email.'); 
    } else {
        console.log('Sending password reset email to: ' + email);
        navigate('/reset-password'); 
    }   
  };


  return (
    <div className="flex justify-center py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} action="#" method="post">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" 
             value={email} onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          <div className="mt-4">
            <button onClick={handleClick} type='button' disabled={loading} className="w-full bg-red-500 text-white text-sm 
            font-semibold py-2 rounded-lg
           hover:bg-red-600 transition duration-200 uppercase"
            >
              Send
            </button>
            
          </div>

          {message && <p>{message}</p>}
            {error && <p className='text-center text-danger'>{error}</p>}
        </form>

        
      </div>
    </div>
  );
}
