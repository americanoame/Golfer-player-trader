import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { loading, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword({ temporaryPassword, newPassword }));

      navigate('/signing');
    } catch (error) {
      console.log('Error:', error);
      
    }
  };

  return (
    <div className="flex justify-center py-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500 text-center">Reset Password</h2>
        <form onSubmit={handlePasswordReset} action="#" method="post">
          <div className="mb-4">
            <label htmlFor="temporaryPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left"></label>
            <input type="password" id="temporaryPassword" placeholder="Temporary Password" className="w-full px-3 py-2 border rounded-lg" onChange={(e) => setTemporaryPassword(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="temporaryPassword" className="block text-gray-700 text-sm font-bold mb-2 text-left"></label>
            <input type="password" id="newPassword" placeholder="New Password" className="w-full px-3 py-2 border rounded-lg" onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white text-sm font-semibold py-2 rounded-lg
           hover:bg-red-600 transition duration-200 uppercase"
            >
              Send
            </button>
            {message && <p>{message}</p>}
            {error && <p className="text-center text-danger">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
