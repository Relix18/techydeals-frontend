import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../redux/api/user";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset link sent to your email");
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    forgotPassword(data);
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
              We will send you an email to reset your password.
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
                    autoComplete="email"
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Submit
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Go back to?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-green-600 hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
