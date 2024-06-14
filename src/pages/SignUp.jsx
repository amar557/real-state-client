import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, json, useNavigate } from "react-router-dom";
import { updatUser } from "../redeux/userslice";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
function SignUp() {
  const [formdata, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputs = function (e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formdata, [name]: value });
  };
  const handleRegisterWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userdata = await signInWithPopup(auth, provider);

    if (userdata) {
      try {
        const data = await fetch("http://localhost:3000/api/loginwithgoogle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userdata.user.displayName,
            email: userdata.user.email,
            avatar: userdata.user.photoURL,
          }),
        });
        const jsondata = await data.json();
        dispatch(updatUser(jsondata));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const submitData = async function (e) {
    e.preventDefault();
    try {
      let { username, email, password } = formdata;
      if (!username || !email || !password)
        throw new Error("every field is required");
      setLoading(true);
      const data = await fetch("http://localhost:3000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const jsondata = await data.json();
      if (data.ok) {
        dispatch(updatUser(jsondata));
        setFormData({ username: "", email: "", password: "" });
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
        sign up
      </h1>
      <input
        type="text"
        name="username"
        id="username1"
        placeholder="username"
        value={formdata.username}
        className="border rounded-lg  outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
        onChange={handleInputs}
      />
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
        value={loading ? `loading...` : `signup`}
        placeholder="username"
        className="border cursor-pointer text-white rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-[#334155] "
      />
      <input
        type="button"
        name=""
        onClick={handleRegisterWithGoogle}
        id=""
        value="continue with google "
        placeholder="username"
        className="border rounded-lg cursor-pointer text-white outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-[#b91c1c] "
      />
      <p className="w-1/3 first-letter:uppercase">
        have an account?
        <span className="text-blue-400 ms-2">
          <Link to="/signin" className="">
            sign in
          </Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
