const Navbar = () => {
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
            <a href="/signup" className="text-red-500 ">
              Register
            </a>
            <button onClick={() => (window.location.href = '/signing')} className="text-white text-lg
             bg-green-500 rounded-lg px-3 py-2 hover:bg-green-600 transition duration-300 ease-in-out">
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
