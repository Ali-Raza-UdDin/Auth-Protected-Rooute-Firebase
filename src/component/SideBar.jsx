import React, { useState } from "react";
import { User, X, Minus, Feather } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [{ title: "User Managment", icon: User }];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-black h-screen p-5 pt-8 relative duration-300`}
      >
        <button
          className="absolute text-white cursor-pointer -right-3 top-9 w-6 h-6 bg-[#323333] border-1 border-white rounded-full flex items-center justify-center"
          onClick={toggleSidebar}
        >
          {open ? <X className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
        </button>

        <div className="flex gap-x-4 items-center">
        <Feather className="text-white"/>
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            CMS
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-gray-700"}`}
            >
              <Menu.icon className="w-5 h-5" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
