import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import CreateListing from "./pages/CreateListing";

function App() {
  const { rest } = useSelector((user) => user.userslice.user);
  console.log(rest);
  // const rest = { username: "", email: "", password: "" };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="createListing" element={<CreateListing />} />
            <Route
              path="profile"
              element={
                rest.username ? <Profile /> : <Navigate to={"/signin"} />
              }
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
