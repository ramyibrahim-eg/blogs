import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Ditails from "./pages/ditails/Ditails";
import AddEditBlog from "./pages/add-edit-blog/AddEditBlog";
import About from "./pages/about/About";
import NotFound from "./pages/404/NotFound";
import Header from "./components/header/Header";
import Auth from "./pages/auth/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Footer from "./components/footer/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("Success LogOut");
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <>
      <ToastContainer />
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/ditails/:id" element={<Ditails user={user} />} />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/auth" />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={user?.uid ? <Navigate to="/" /> : <Auth />}
          setUser={setUser}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
