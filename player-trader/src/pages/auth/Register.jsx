import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="flex justify-center py-1">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-500">Create an Account</h2>
        <form action="#" method="post">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Username
            </label>
            <input type="text" id="username" name="username" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Password
            </label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 text-left">
             Confirm Password
            </label>
            <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          
        </form>

        <div className="mt-4">
          <button className="w-full bg-red-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-200">Register</button>
        </div>

        <p className="text-gray-600 text-sm mt-4">
          have an account{' '}
          <Link to="/sign-in">
            <button href="#" className="text-green-500">Sign In</button>
          </Link>
        </p>
        <p className="text-red-700 mt-5"></p>
      </div>
    </div>
  );
}

export default Register;
