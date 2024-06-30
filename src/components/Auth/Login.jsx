import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLoginUserMutation } from "../../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../redux/reducer/auth";
import { selectCurrentUser } from "../../redux/reducer/auth";

const Login = () => {
  const [showPasswords, setShowPasswords] = useState({
    password1: false,
  });
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [loginUser, { data, isSuccess, error, isError }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedIn(data.user));
    }
  }, [isSuccess, data, dispatch]);

  const handleTogglePassword = (field) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <>
      {currentUser?.verified && <Navigate to={"/"} replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex items-center justify-center gap-5">
            <div className="rounded-full h-10 w-10 overflow-hidden">
              <img src={logo} />
            </div>
            TechyDeals
          </h1>
          <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forget-password"}
                    className="font-semibold text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPasswords.password1 ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute top-0 right-0 h-full w-10 flex items-center justify-center"
                  onClick={() => handleTogglePassword("password1")}
                >
                  {showPasswords.password1 ? (
                    <IoEyeOffOutline />
                  ) : (
                    <IoEyeOutline />
                  )}
                </div>
                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
            </div>

            {isError && (
              <div className="bg-red-200 text-red-800 py-1.5 px-2 rounded">
                {error.data.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center uppercase rounded-md bg-green-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New Customer?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-green-600 hover:text-green-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
