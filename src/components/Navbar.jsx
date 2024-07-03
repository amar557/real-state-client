import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const pages = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
];
function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchResult = function (params) {
    const url = new URLSearchParams(window.location.search);
    url.set("searchTerm", searchTerm === null ? "" : searchTerm);
    const searchQuery = url.toString();
    navigate(`search?${searchQuery}`);
  };

  useEffect(() => {
    const urlsParam = new URLSearchParams(window.location.search);
    const query = urlsParam.get("searchTerm");
    setSearchTerm(query);
  }, [window.location.search]);
  const { rest } = useSelector((user) => user.userslice.user);
  // console.log(rest);
  // const rest = { username: "", email: "", password: "" };
  return (
    <div className="flex z-50  items-center bg-[#e2e8f0] py-4 justify-around shadow-md fixed w-full">
      <Link to="/">
        <span className="font-bold tracking-wider text-2xl  capitalize text-slate-500">
          real
        </span>
        <span className="font-bold tracking-wider text-2xl  capitalize text-slate-700">
          state
        </span>
      </Link>
      <div className="flex bg-[#f1f5f9] px-2 py-1 rounded-md w-1/5 items-center justify-between ">
        <input
          type="text"
          name=""
          id=""
          className="bg-transparent placeholder:capitalize py-2   placeholder:text-xs border-0 w-full outline-none text-xs"
          placeholder="search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button onClick={handleSearchResult}>
          <IoIosSearch />
        </button>
      </div>

      <ul className="flex items-center justify-center gap-4">
        {pages.map((page, i) => (
          <li key={i} className="capitalize text-base font-semibold">
            <NavLink to={page.href}>{page.label}</NavLink>
          </li>
        ))}
        {rest.username ? (
          <li className="capitalize text-base font-semibold">
            <NavLink to={"/profile"}>
              <img
                src={
                  rest.avatar ||
                  "https://lh3.googleusercontent.com/a/ACg8ocKZsQn9xjvbWtBI026S5XeAwK1r-1oI9X7RBflGqhR5nxfgzQ=s96-c"
                }
                alt="profile pic"
                className="h-10 w-10 rounded-full object-cover"
              />
            </NavLink>
          </li>
        ) : (
          <>
            <li className="capitalize text-base font-semibold">
              <NavLink to={"/signin"}>sign in</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
