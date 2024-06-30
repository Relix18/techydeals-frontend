import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useUpdatePasswordMutation } from "../../redux/api/user";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    password1: false,
    password2: false,
    password3: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [updatePassword] = useUpdatePasswordMutation();

  const handleTogglePassword = (field) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [field]: !prevShowPasswords[field],
    }));
  };

  const onSubmit = (data) => {
    updatePassword(data);
    navigate("/account/edit");
  };

  return (
    <section className="py-12 text-green-900 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-screen-sm px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-xl shadow-xl border-t-4 border-green-300 shadow-green-200">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
                Change your password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Old Password
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type={showPasswords.password1 ? `text` : `password`}
                      {...register("oldPassword", {
                        required: "Old Password is required",
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
                  {errors.oldPassword && (
                    <p className="text-red-500">{errors.oldPassword.message}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.password2 ? `text` : `password`}
                      {...register("newPassword", {
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
                      onClick={() => handleTogglePassword("password2")}
                    >
                      {showPasswords.password2 ? (
                        <IoEyeOffOutline />
                      ) : (
                        <IoEyeOutline />
                      )}
                    </div>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500">{errors.newPassword.message}</p>
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
                      type={showPasswords.password3 ? `text` : `password`}
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value, formValue) =>
                          value === formValue.newPassword ||
                          "Passwords don't match",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                    <div
                      className="absolute top-0 right-0 h-full w-10 flex items-center justify-center"
                      onClick={() => handleTogglePassword("password3")}
                    >
                      {showPasswords.password3 ? (
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

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
