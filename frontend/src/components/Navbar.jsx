import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col md:flex-row bg-[#edece3] items-center justify-between px-6 md:px-[200px] py-4 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-mono md:text-3xl font-extrabold">
        <Link to="/">BLOGIFY</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center relative w-full md:w-auto">
          <BsSearch className="absolute left-3 text-gray-400" />
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none pl-10 pr-3 py-1.5 rounded-md border border-gray-300 w-full md:w-auto"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            <Link to="/write">Write</Link>
          </button>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu} className="relative">
            <p className="cursor-pointer"><FaBars /></p>
            {menu && <Menu className="absolute top-full right-0 mt-2" />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg relative">
        <p className="cursor-pointer"><FaBars /></p>
        {menu && <Menu className="absolute top-full right-0 mt-2" />}
      </div>
    </div>
  );
};

export default Navbar;
