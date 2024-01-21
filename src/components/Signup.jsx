import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { login } from "../store/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const signupHandler = async (data) => {
    setError("");
    try {
      const createAccount = await authService.createAccount(data);
      if (createAccount) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <span className="font-bold text-2xl">FirstBlog</span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign in to your account
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(signupHandler)} className="mt-8">
            <div className="space-y-5">
              <div className="mt-2">
                <Input
                  label="Username"
                  type="text"
                  placeholder="Set your username"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
              <div className="mt-2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be valid",
                    },
                  })}
                />
              </div>
              <div>
                <div className="mt-2"></div>
                <div className="mt-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Set your password"
                    {...register("password", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                            value
                          ) || "Password must be at least 8 characters long",
                      },
                    })}
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="fleading-7 border border-black text-black hover:bg-black/80 hover:text-white w-full"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
