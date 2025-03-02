import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";
import { useLocation } from "react-router";
import { toast } from "react-hot-toast";

const TopNav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken") || "";
  const name=localStorage.getItem("first_name") || "";
  const firstChar = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("first_name")
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <>
      {token ? (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white p-2 px-6 flex justify-between items-center border-b md:flex">
          <span className="text-sm font-semibold text-gray-700">
            Welcome, {name}
          </span>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                {firstChar}
              </div>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute z-50 right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg">
                <button
                  onClick={() => navigate("/profile") || setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout || setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white p-4 px-6 flex justify-center items-center border-b md:flex">
          <span className="text-lg text-center font-semibold text-gray-700">
            Welcome To Our Website
          </span>
        </div>
      )}
    </>
  );
};

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {location.pathname.includes("login") ||
      location.pathname.includes("register") ? null : (
        <>
          <TopNav />
          <header className="fixed top-12 left-0 right-0 z-40 bg-white shadow">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-[40px] w-[90px]" src={icon} alt="Logo" />
              </a>

              <div className="hidden lg:flex lg:gap-x-12 items-center w-full lg:w-auto">
                <a href="/" className="text-md font-semibold text-gray-900">
                  Home
                </a>
                <div className="relative">
                  <button
                    className="text-md font-semibold text-gray-900 flex items-center gap-1"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Services
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border shadow-lg rounded-lg">
                      <button
                        onClick={() => handleNavigation("/chat-1")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Chat 1
                      </button>
                      <button
                        onClick={() => handleNavigation("/chat-2")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Chat 2
                      </button>
                      <button
                        onClick={() => handleNavigation("/chat-3")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Chat 3
                      </button>
                      <button
                        onClick={() => handleNavigation("/chat-4")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Chat 4
                      </button>
                    </div>
                  )}
                </div>
                <a
                  href="#about-us"
                  className="text-md font-semibold text-gray-900"
                >
                  About Us
                </a>
                {token ? null : (
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-md font-semibold hover:bg-indigo-700"
                  >
                    Login
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </nav>
          </header>

          {isMobileMenuOpen && (
            <div className="fixed inset-y-0 right-0 w-64 top-11 z-40  bg-white border-l p-4 flex flex-col items-center transform transition-transform duration-300 ease-in-out translate-x-0">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end mb-4"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <a
                href="/"
                className="py-2 text-sm text-gray-700  hover:bg-gray-100 w-full text-center"
              >
                Home
              </a>
              <button
                onClick={() => handleNavigation("/chat-1")}
                className="py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
              >
                Chat 1
              </button>
              <button
                onClick={() => handleNavigation("/chat-2")}
                className="py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
              >
                Chat 2
              </button>
              <button
                onClick={() => handleNavigation("/chat-3")}
                className="py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
              >
                Chat 3
              </button>
              <button
                onClick={() => handleNavigation("/chat-4")}
                className="py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
              >
                Chat 4
              </button>

              <a
                href="#about-us"
                className="py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
              >
                About US
              </a>
              {token ? null : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-indigo-600 text-white px-4 py-2 w-full rounded-md text-sm font-semibold hover:bg-indigo-700 mt-4"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Nav;
