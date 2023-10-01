import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/sign-out');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  let Links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="relative z-10 w-full  top-0 left-0">
      <nav className="container mx-auto md:flex items-center justify-between py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-green-800">
          <span className="text-5xl">🏌🏻‍♂️</span>
          <span className="text-4xl text-red-500 font-bold">G</span>olfertrader.com
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>

        <div>
          <ul
            className={`md:flex z-10 md:items-center md:pb-4 pb-12 absolute md:static ${
              open ? 'bg-black top-20' : 'bg-transparent top-[-490px]'
            } left-0 w-full md:pl-0 pl-9 md:w-auto transition-all duration-500 ease-in 
            md:z-auto z-[-1]`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className={`md:ml-8 text-xl md:my-0 my-7 px-4  bg-transparent ${
                  open ? 'md:bg-black' : 'md:bg-transparent'
                } md:hover:bg-transparent rounded-lg`}
              >
                <a
                  href={link.link}
                  className="text-gray-800 
                hover:text-green-400 duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}

            {currentUser ? (
              <>
                <button onClick={handleSignOut} className="text-red-500 ml-4">
                  Logout
                </button>

                <button className="mr-2" onClick={() => (window.location.href = '/profile')}>
                  <img src={currentUser.profilePicture} alt="profile" className="h-12 w-12 rounded-full object-cover mt-2" />
                </button>
              </>
            ) : (
              <button onClick={() => (window.location.href = '/profile')}>
                <h5>Sign In</h5>
              </button>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
