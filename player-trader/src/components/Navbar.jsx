import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/sign-out');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mt-2">
      <nav className="container mx-auto ">
        <div className="flex justify-between items-center">
          <a href="/" className="text-green-500 text-xl font-bold italic ml-4">
            {/* <span className="text-1xl text-red-500">⛳️</span> */}
            <span className="text-5xl">🏌🏻‍♂️</span>
            <span className="text-4xl text-red-500 font-bold">G</span>olfertrader.com
          </a>

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
              isMenuOpen ? 'active' : ''
            }`}
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            hidden={!isMenuOpen}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`hidden w-full md:block  md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
            
            
            
            <a href="/" className="text-red-500 mr-4">
              Home
            </a>
            <a href="/about" className="text-red-500 mr-4">
              About
            </a>

            {currentUser ? (
              <>
                {/* <h1 className='text-red-700'>welcome: {currentUser.name} </h1> */}
                <button onClick={handleSignOut} className="text-red-500 ml-4">
                  Logout
                </button>

                <button onClick={() => (window.location.href = '/profile')}>
                  <img src={currentUser.profilePicture} alt="profile" className="h-12 w-12 rounded-full object-cover mt-2" />
                </button>
              </>
            ) : (
              <button onClick={() => (window.location.href = '/profile')}>
                <h5>Sign In</h5>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
