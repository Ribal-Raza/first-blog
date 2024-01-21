/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const [loader, setLoader] = useState();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    const handleNavigation = () => {
      if (authentication && !authStatus) {
        navigate("/login");
      } else if (!authentication && authStatus) {
        navigate("/");
      }
    };
    handleNavigation();
    return () => setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
