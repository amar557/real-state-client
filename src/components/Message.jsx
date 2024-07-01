import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { link } from "../firebase/api";

function Message({ data }) {
  const [message, setMessage] = useState("");
  const [curUser, setCurUser] = useState({});
  console.log(data);
  useEffect(() => {
    async function getData() {
      const res = await fetch(`${link}/api/getUser/${data.userRef}`, {
        method: "GET",
      });
      const jsonres = await res.json();
      setCurUser(jsonres);
      console.log(jsonres);
    }
    getData();
  }, []);
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-sm">
        Contact <span className="font-semibold">{curUser?.username}</span> for
        <span className="font-semibold"> {data.name}</span>
      </p>
      <textarea
        name=""
        className="w-full p-3"
        id=""
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <Link
        to={`mailto:${curUser?.email}?body=${message}`}
        className="bg-slate-700 text-center w-full py-2 text-white  uppercase rounded-lg mb-10"
      >
        send message
      </Link>
    </div>
  );
}

export default Message;
