import { useEffect, useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/api/user";
import clsx from "clsx";

const UserRole = () => {
  const params = useParams();
  const { data: user } = useGetUserByIdQuery(params.id);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const secure = import.meta.env.VITE_SECURE_MAIL;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", user && user.user.name);
    setValue("email", user && user.user.email);
    setValue("role", user && user.user.role);
  }, [user, setValue]);

  return (
    <div id="editUser" className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div
        id="toggleBtn"
        className=" md:hidden z-50 absolute right-5 top-5 w-10 h-10 rounded-full text-white flex items-center justify-center bg-green-500"
        onClick={() => setShow(!show)}
      >
        <FaBars className="text-xl" />
      </div>
      <SidebarMobile isOpen={show} />

      <div className="w-screen px-2 py-10">
        <div className="flex w-full bg-white flex-col space-y-5 rounded-lg border py-10 px-5 mt-2 shadow-xl mx-auto">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              updateUser({ role: data.role, id: params.id });

              reset();
              navigate("/admin/users");
            })}
            className="flex w-full flex-col space-y-5"
          >
            <div className="mb-2 space-y-3">
              <h1 className=" text-3xl font-bold text-gray-700">Update Role</h1>
            </div>
            <div>
              <label className=""> Name </label>
              <input
                className="mt-2  focus:border-none focus:ring-green-500 h-12 w-full rounded-md bg-gray-100 px-3 border-gray-300"
                type="text"
                id="name"
                placeholder="Name"
                {...register("name", {
                  required: "name is required",
                })}
                readOnly
              />
            </div>
            <div>
              <label className=""> Email </label>
              <input
                className="mt-2  focus:border-none focus:ring-green-500 h-12 w-full rounded-md bg-gray-100 px-3 border-gray-300"
                type="text"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "email is required",
                })}
                readOnly
              />
            </div>
            <div>
              <label className=""> Category </label>

              <select
                id="role"
                {...register("role", {
                  required: "role is required",
                })}
                className="mt-2 h-12 flex w-full rounded-md focus:border-none focus:ring-green-500 select-none border p-2 px-3 bg-gray-100 border-gray-300 text-gray-700 ring-green-400 "
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={
                user?.user.role === "admin" && user?.user.email === secure
              }
              className={clsx(
                "rounded-lg  py-3 font-bold ",
                user?.user.role === "admin" && user?.user.email === secure
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white cursor-pointer"
              )}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRole;
