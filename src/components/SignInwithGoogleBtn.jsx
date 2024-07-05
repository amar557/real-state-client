import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { link } from "../firebase/api";
import { updatUser } from "../redeux/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignInwithGoogleBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegisterWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userdata = await signInWithPopup(auth, provider);

    if (userdata) {
      try {
        const data = await fetch(`${link}/api/loginwithgoogle`, {
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
  return (
    <>
      <input
        type="button"
        name=""
        onClick={handleRegisterWithGoogle}
        id=""
        value="continue with google "
        placeholder="username"
        className="border rounded-lg cursor-pointer text-white outline-none text-sm w-full   px-3 py-3 mb-2 uppercase bg-[#b91c1c] "
      />
    </>
  );
}

export default SignInwithGoogleBtn;
