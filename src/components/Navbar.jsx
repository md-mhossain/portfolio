import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { navItems } from "../constants/data.js";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import DarkModeToggle from "./DarkMode.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-[100]">
      <nav className="container px-4 md:px-0 py-3 bg-[#00000003] z-[200]  dark:bg-gray-900 rounded-br-[30px] rounded-bl-[30px] transition-colors duration-300">
        <div className="grid grid-cols-12 items-center">
          {/* Logo */}
          <div className="col-span-6 md:col-span-5">
            <NavLink
              to={"/"}
              className="uppercase font-extrabold text-[34px] dark:text-white"
            >
              dev.monir
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="block col-span-6 md:hidden text-right space-x-8">
            <div className="inline col-span-1 md:hidden text-right text-3xl">
              <DarkModeToggle />
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="text-black dark:text-white text-3xl"
            >
              <MdMenu className="cursor-pointer" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:col-span-7 md:block">
            <div className="grid grid-cols-12 items-center">
              {/* Menu */}
              <div className="col-span-8">
                <ul className="flex items-center gap-10 font-normal">
                  {navItems.map((item, index) => {
                    const isResume = item.label === "Resume";

                    // Common classes to keep your design consistent
                    const commonStyles = `hover:text-primary dark:text-white transition-colors duration-200 relative group ${
                      item.label === "Start Project" ? "block md:hidden" : ""
                    }`;

                    return (
                      <li key={index}>
                        {isResume ? (
                          <a
                            href={item.path}
                            download="Monir_Hossain.pdf"
                            className={commonStyles}
                          >
                            {item.label}
                            <span className="absolute left-0 -bottom-1.5 bg-gradient-to-r from-teal-300 to-lime-500 w-0 group-hover:w-[80%] transition-all duration-300 ease-in-out h-1 rounded-md"></span>
                          </a>
                        ) : (
                          /* Existing NavLink for internal routing */
                          <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                              `${commonStyles} ${isActive ? "font-semibold" : ""}`
                            }
                          >
                            {item.label}
                            <span className="absolute left-0 -bottom-1.5 bg-gradient-to-r from-teal-300 to-lime-500 w-0 group-hover:w-[80%] transition-all duration-300 ease-in-out h-1 rounded-md"></span>
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/*<div*/}
              {/*    className="text-2xl flex justify-center items-center w-full hover:scale-105 transition-all duration-300">*/}
              {/*    <DarkModeToggle/>*/}
              {/*</div>*/}

              {/* Button */}
              <div className="col-span-4 flex gap-8 justify-end">
                <div className="text-2xl flex justify-center items-center hover:scale-105 transition-all duration-300">
                  <DarkModeToggle />
                </div>
                <Button
                  className="group flex items-center  cursor-pointer border border-black dark:border-white dark:text-white"
                  icon={
                    <FaArrowRightLong className="duration-800 group-hover:translate-x-24 z-10 group-hover:bg-black group-hover:text-white border border-black dark:border-white rounded-full p-1 text-xl" />
                  }
                  text="Start Project"
                  path={"/contact"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed top-0 inset-0 bg-white dark:bg-gray-900 flex flex-col text-xl z-40">
            <div className="dark:text-white absolute top-0 right-0 p-5 text-3xl">
              <button onClick={() => setOpen(false)}>
                <IoMdClose className="cursor-pointer" />
              </button>
            </div>
            <ul className="py-18">
              {navItems.map((item, index) => {
                const isResume = item.label === "Resume";

                const commonStyles = ({ isActive }) => `
        hover:text-primary dark:text-white transition-colors duration-200 relative group
        ${isActive ? "font-semibold text-primary" : ""}
    `;

                return (
                  <li key={index} className="my-4 text-center">
                    {isResume ? (
                      <a
                        href={item.path}
                        download="Monir_Hossain.pdf"
                        className="hover:text-primary dark:text-white transition-colors duration-200 relative group"
                      >
                        {item.label}
                        <span className="absolute left-0 -bottom-1.5 bg-gradient-to-r from-teal-300 to-lime-500 w-0 group-hover:w-[80%] transition-all duration-300 ease-in-out h-1 rounded-md"></span>
                      </a>
                    ) : (
                      <NavLink to={item.path} className={commonStyles}>
                        {item.label}
                        <span className="absolute left-0 -bottom-1.5 bg-gradient-to-r from-teal-300 to-lime-500 w-0 group-hover:w-[80%] transition-all duration-300 ease-in-out h-1 rounded-md"></span>
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
