import { useDispatch } from "react-redux";
import authService from "../../appwrite/authService";
import { logout } from "../../store/authSlice";
import Button from "./Button";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    // <button
    //   type="button"
    //   onClick={logoutHandler}
    //   className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
    // >
    //   Log out
    // </button>
    <Button
      type="button"
      className=" hover:bg-black hover:text-white border border-black"
      onClick={logoutHandler}
    >
      Log out
    </Button>
  );
};

export default LogoutBtn;
