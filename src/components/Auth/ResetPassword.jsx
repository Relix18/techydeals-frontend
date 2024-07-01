import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../redux/api/user";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import toast from "react-hot-toast";
import Loader from "../utils/Loader";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    password1: false,
    password2: false,
  });
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [resetPassword, { error, isError, isLoading, isSuccess }] =
    useResetPasswordMutation();

  const handleTogglePassword = (field) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
    }
  }, [isSuccess]);

  const submitHandler = async (data) => {
    await resetPassword({ token, ...data });
    setValue("password1", "");
    setValue("password2", "");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex items-center justify-center gap-5">
              <div className="rounded-full h-10 w-10 overflow-hidden">
                <img src={logo} />
              </div>
              TechyDeals
            </h1>
            <h2 className="mt-10 text-center text-lg leading-9 tracking-tight text-gray-900">
              Reset your password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPasswords.password1 ? `text` : `password`}
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters, must contain uppercase letter, lowercase letter, number and special characters`,
                      },
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
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.password2 ? `text` : `password`}
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                      validate: (value, formValue) =>
                        value === formValue.password || "Passwords don't match",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                  <div
                    className="absolute top-0 right-0 h-full w-10 flex items-center justify-center"
                    onClick={() => handleTogglePassword("password2")}
                  >
                    {showPasswords.password2 ? (
                      <IoEyeOffOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {isError && (
                <div className="bg-red-200 text-red-600 py-1.5 px-2 rounded">
                  {error.data.message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
            {isSuccess && (
              <p className="mt-10 text-center text-sm text-gray-500">
                Go back to?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-green-600 hover:text-green-500"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
