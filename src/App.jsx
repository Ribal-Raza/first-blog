import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return !loading ? (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default App;
