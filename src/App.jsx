import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import CreateListing from "./pages/CreateListing";
import ListPage from "./pages/ListPage";
import UpdateListinng from "./pages/UpdateListinng";
import GSearchResult from "./pages/GSearchResult";

function App() {
  const { rest } = useSelector((user) => user.userslice.user);
  console.log(rest._id);
  // const rest = { username: "", email: "", password: "" };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="createListing" element={<CreateListing />} />
            <Route path="listitem/:id" element={<ListPage />} />
            <Route path="search" element={<GSearchResult />} />
            <Route path="updatelisting/:id" element={<UpdateListinng />} />
            <Route
              path="profile"
              element={rest._id ? <Profile /> : <Navigate to={"/signin"} />}
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
