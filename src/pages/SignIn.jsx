import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updatUser } from "../redeux/userslice";

function SignIn() {
  const [formdata, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputs = function (e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formdata, [name]: value });
  };
  const submitData = async function (e) {
    e.preventDefault();
    try {
      let { email, password } = formdata;
      if (!email || !password) throw new Error("every field is required");
      setLoading(true);
      const data = await fetch("http://localhost:3000/api/userexist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        withCredentials: true,
      });
      const jsondata = await data.json();
      if (data.ok) {
        setFormData({ email: "", password: "" });
        navigate("/");
        dispatch(updatUser(jsondata));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col ">
      <h1 className="text-3xl font-semibold text-center capitalize mb-7">
        sign in
      </h1>

      <input
        type="text"
        name="email"
        id="email1"
        placeholder="email"
        value={formdata.email}
        onChange={handleInputs}
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="password"
        name="password"
        onChange={handleInputs}
        id="password1"
        value={formdata.password}
        placeholder="password"
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="button"
        name=""
        id=""
        onClick={submitData}
        value={loading ? `loading...` : `signin`}
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
          <Link to="/signup" className="">
            sign up
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;
