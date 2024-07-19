import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Check local storage on component mount
  useEffect(() => {
    const userLoginData = localStorage.getItem('userLoginData');
    const userSignupData = localStorage.getItem('userSignupData');
    if (userLoginData || userSignupData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear local storage and update state
    localStorage.removeItem('userLoginData');
    localStorage.removeItem('userSignupData');
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full h-16 bg-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-black">Quiz App</h1>
          </div>
          <div className="hidden md:flex space-x-4">
            {/* Conditionally render Login/Signup or Logout button */}
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="border-0 p-2 text-black hover:bg-slate-200 lg:text-lg sm:text-sm transition ease-in duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="border-0 p-2 text-black hover:bg-slate-200 lg:text-lg sm:text-sm transition ease-in duration-300">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="border-0 p-2 text-black hover:bg-slate-200 lg:text-lg sm:text-sm transition ease-in duration-300"
              >
                Logout
              </button>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:border-b-4 p-2 transition ease-in duration-300"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-4 md:hidden">
          {/* Conditionally render Login/Signup or Logout button */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block py-2 text-black hover:border-b-2 transition ease-in duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-black hover:border-b-2 transition ease-in duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block py-2 text-black hover:border-b-2 transition ease-in duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
