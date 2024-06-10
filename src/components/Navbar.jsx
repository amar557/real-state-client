import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
const pages = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "sign in", href: "signin" },
  { label: "sign up", href: "signup" },
];
function Navbar() {
  return (
    <div className="flex z-50  items-center bg-[#e2e8f0] py-4 justify-around shadow-md fixed w-full">
      <div>
        <span className="font-bold tracking-wider text-2xl  capitalize text-slate-500">
          real
        </span>
        <span className="font-bold tracking-wider text-2xl  capitalize text-slate-700">
          state
        </span>
      </div>
      <div className="flex bg-[#f1f5f9] px-2 py-1 rounded-md w-1/5 items-center justify-between ">
        <input
          type="text"
          name=""
          id=""
          className="bg-transparent placeholder:capitalize py-2   placeholder:text-xs border-0 w-full outline-none text-xs"
          placeholder="search..."
        />
        <IoIosSearch />
      </div>

      <ul className="flex items-center justify-center gap-4">
        {pages.map((page, i) => (
          <li key={i} className="capitalize text-base font-semibold">
            <NavLink to={page.href}>{page.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
