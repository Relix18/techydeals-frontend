import { IoAdd } from "react-icons/io5";
import {
  useDeleteAddressMutation,
  useGetUserAddressQuery,
  useUpdateAddressMutation,
} from "../../redux/api/user";
import AddAddress from "./NewAddress";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const MyAddress = () => {
  const { data: address } = useGetUserAddressQuery();
  const [deleteAddress] = useDeleteAddressMutation();
  const [editedAddress] = useUpdateAddressMutation();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const editHandler = (data) => {
    setValue("name", data?.address.name);
    setValue("email", data?.address.email);
    setValue("phone", data?.address.phone);
    setValue("street", data?.address.street);
    setValue("city", data?.address.city);
    setValue("state", data?.address.state);
    setValue("zip", data?.address.zip);
    setValue("id", data?._id);
    setEdit(true);
  };

  const editAddress = (data) => {
    editedAddress(data);
    reset();
    setEdit(false);
    toast.success("Address Edited");
  };

  const deleteHandler = (id) => {
    deleteAddress(id);
    toast.success("Address Deleted");
  };

  return (
    <section className=" text-green-900">
      {add && <AddAddress open={setAdd} />}

      {edit && (
        <>
          {/* Edit */}
          <div className="lg:col-span-3">
            <form
              className="bg-white py-2 px-5 mt-6"
              noValidate
              onSubmit={handleSubmit((data) => editAddress(data))}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-6">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Edit Your Address
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", { required: true })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: true })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", { required: true })}
                          type="number"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", { required: true })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", { required: true })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", { required: true })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP Code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("zip", { required: true })}
                          id="zip"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="text-sm px-3 py-2 rounded-md font-semibold leading-6 bg-slate-200 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {!edit && !add && (
        <>
          {/* All addresses */}
          <div className="relative mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="relative mx-auto my-20 grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
                <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
                  <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                    <div className="flex-1">
                      <blockquote className="mt-8 flex justify-center items-center">
                        <IoAdd className="text-8xl text-green-500" />
                      </blockquote>
                    </div>
                    <div className="-mx-5 mt-8 px-8 py-1">
                      <div className="">
                        <button
                          onClick={() => setAdd(true)}
                          className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        >
                          Add New Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {address?.addresses.map((address) => (
                  <div
                    key={address._id}
                    className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200"
                  >
                    <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                      <div className="flex-1">
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">Name:</span>{" "}
                            {address.address.name}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">Email:</span>{" "}
                            {address.address.email}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">City:</span>{" "}
                            {address.address.city}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">
                              Street:
                            </span>{" "}
                            {address.address.street}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">State:</span>{" "}
                            {address.address.state}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">Zip:</span>{" "}
                            {address.address.zip}
                          </p>
                        </blockquote>
                        <blockquote className=" flex">
                          <p className="leading-relaxed text-green-900">
                            <span className="font-bold text-black">Phone:</span>{" "}
                            {address.address.phone}
                          </p>
                        </blockquote>
                      </div>
                      <div className="-mx-5 mt-8 px-8 py-1">
                        <div className=" flex gap-4">
                          <button
                            onClick={() => editHandler(address)}
                            className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteHandler(address._id)}
                            className="inline-flex justify-center rounded-md border border-transparent w-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MyAddress;
