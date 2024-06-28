import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { updatUser } from "../redeux/userslice";
import { link } from "../firebase/api";
function Profile() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [downloadedfile, setDownloadedfile] = useState(null);
  const { rest } = useSelector((user) => user.userslice.user);
  const refer = useRef();
  const navigate = useNavigate();
  function handleFormdata(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSignOut() {
    dispatch(updatUser({ rest: { username: "", email: "", avatar: "" } }));
  }
  async function handleDeleteUser() {
    const userReq = await fetch(`${link}/api/delete/${rest._id}`, {
      method: "DELETE",
    });
    if (userReq.ok) {
      dispatch(updatUser({ rest: { username: "", email: "", avatar: "" } }));
    }
  }
  async function handleSubmitForm() {
    console.log(rest._id);
    const request = await fetch(`${link}/api/update/${rest._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const json = await request.json();

    if (request.ok) {
      dispatch(updatUser(json));
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  async function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = Date.now() + file.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadtask = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(uploadtask.ref);
    setDownloadedfile(url);
    setForm({ ...form, avatar: url });
  }

  return (
    <div className="flex items-center justify-center flex-col ">
      <h1 className="text-3xl font-semibold text-center capitalize mb-7">
        profile
      </h1>
      <input
        type="file"
        ref={refer}
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />
      <img
        src={downloadedfile || rest.avatar}
        alt=""
        className="rounded-full mb-8 h-20 w-20"
        onClick={() => refer.current.click()}
      />
      <input
        type="text"
        name="username"
        id="username2"
        placeholder="username"
        defaultValue={rest.username}
        onChange={handleFormdata}
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="text"
        name="email"
        id="email1"
        placeholder="email"
        defaultValue={rest.email}
        onChange={handleFormdata}
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="password"
        name="password"
        id="password1"
        defaultValue=""
        placeholder="password"
        onChange={handleFormdata}
        className="border rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 placeholder:capitalize placeholder:text-sm placeholder:text-slate-500 "
      />
      <input
        type="button"
        name=""
        id=""
        value={"update"}
        onClick={handleSubmitForm}
        className="border cursor-pointer text-white rounded-lg outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-slate-700 "
      />
      <input
        type="button"
        name=""
        id=""
        value="create listing"
        onClick={() => navigate("/createlisting")}
        className="border rounded-lg cursor-pointer text-white outline-none text-sm w-1/3   px-3 py-3 mb-2 uppercase bg-green-700 "
      />
      <p className="w-1/3 capitalize flex items-center justify-between text-red-500 mt-3">
        <span onClick={handleDeleteUser} className="cursor-pointer">
          delete account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          sign out
        </span>
      </p>
      <Link className="text-center text-green-700 capitalize mt-8">
        show listing
      </Link>
    </div>
  );
}

export default Profile;
