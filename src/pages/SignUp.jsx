import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex items-center justify-center flex-col ">
      <h1 className="text-3xl font-semibold text-center capitalize mb-7">
        sign up
      </h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        className="border rounded-lg  outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="username"
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="button"
        name=""
        id=""
        value="signup"
        placeholder="username"
        className="border cursor-pointer text-white rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-[#334155] "
      />
      <input
        type="button"
        name=""
        id=""
        value="continue with google "
        placeholder="username"
        className="border rounded-lg cursor-pointer text-white outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-[#b91c1c] "
      />
      <p className="w-1/3 first-letter:uppercase">
        have an account?
        <span className="text-blue-400 ms-2">
          <Link to="/" className="">
            sign in
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
