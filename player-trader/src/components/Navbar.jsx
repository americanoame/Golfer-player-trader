// import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Navbar()  {
const {currentUser} = useSelector((state) => state.user);

  return (
    <div className="mt-2">
      <nav className="container mx-auto ">
        <div className="flex justify-between items-center">
          <a href="/" className="text-green-500 text-xl font-bold italic ml-4">
            {/* <span className="text-1xl text-red-500">⛳️</span> */}
            <span className="text-5xl">🏌🏻‍♂️</span>
            <span className="text-4xl text-red-500 font-bold">G</span>olfertrader.com
          </a>
          <div className="space-x-4 mr-4 text-lg">
            <a href="/" className="text-red-500 ">
              Home 
            </a>
            <a href="/about" className="text-red-500 ">
              About 
            </a>

            <button onClick={() => (window.location.href = '/profile')}>
             {currentUser ? (
              <img src={currentUser.profilePicture} alt="profile" className="h-12 w-12 rounded-full 
              object-cover mt-2" />
             ):(
              <h5>Sign In</h5>
             )}
              
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

