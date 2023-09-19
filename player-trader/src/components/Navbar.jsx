const Navbar = () => {
    return (
      <div className="mt-2">
        <nav className="container mx-auto ">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="text-green-500 text-xl font-bold italic"
            >
            {/* <span className="text-1xl text-red-500">⛳️</span> */}
              <span className="text-4xl">🏌🏻‍♂️</span>
              
              <span className="text-4xl text-red-500  font-bold">G</span>olfertrader.com
            </a>
            <div className="space-x-4">
              <a href="/register" className="text-red-500">Register</a>
              <a href="/login" className="text-green-500">Login</a>
            </div>
          </div>
        </nav>
      </div>
    );
  };
  
  export default Navbar;
  