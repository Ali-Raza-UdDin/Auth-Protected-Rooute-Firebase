import React, { useState } from "react";
import "./Navbar.css";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className=" navbar ">
      <div className="navbar-left pl-4">
        <Link href="/" className="logo">
          {location.pathname
            .split("/")
            .filter((segment) => segment)
            .map((segment) =>
              segment
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
                .replace(/^./, (char) => char.toUpperCase())
            )}
        </Link>
      </div>

      <div className="navbar-right">
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <div className="relative">
            <button
              className="flex items-center text-sm rounded-full"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <User className="h-5 w-5 text-black" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ringring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 text-xs text-gray-500">
                  My Account
                </div>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
