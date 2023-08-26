import { Link } from "react-router-dom";
import { navLinks } from "./../../../utils/navLinks";

export default function SideNav() {
  return (
    <nav className="mt-5 px-2">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-blue-800 hover:text-blue-300"
        >
          {link.icon}
          {link.text}
        </Link>
      ))}
      <button className="bg-blue-400 w-48 md:w-36 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white-600 focus:ring-offset-2">
        Post
      </button>
    </nav>
  );
}
