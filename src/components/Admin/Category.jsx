import { Fragment, useEffect, useState } from "react";
import SideBar, { SidebarMobile } from "./Sidebar";
import { useForm } from "react-hook-form";
import { MdCategory } from "react-icons/md";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductCategoryQuery,
} from "../../redux/api/product";
import { Dialog, Transition } from "@headlessui/react";

const Category = () => {
  const [createCategory, { error, isSuccess }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categories } = useGetProductCategoryQuery();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      toast.error("Category Already Exists");
    }

    if (isSuccess) {
      toast.success("Category Added");
    }
  }, [error, isSuccess]);

  const handleDeleteConfirmation = (productId) => {
    setSelectedProductId(productId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (selectedProductId) {
      deleteCategory(selectedProductId);
      setDeleteConfirmationOpen(false);
      setSelectedProductId(null);
    }
  };

  return (
    <>
      <Transition appear show={isDeleteConfirmationOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDeleteConfirmationOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to cancel this order?
                  </Dialog.Title>

                  <div className="mt-4 flex w-full justify-center gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none"
                      onClick={() => handleDeleteConfirmed()}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setDeleteConfirmationOpen(false)}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div id="categoryAdmin" className="flex bg-gray-100">
        <SideBar />
        <div
          id="toggleBtn"
          className=" md:hidden z-50 absolute right-5 top-5 w-10 h-10 rounded-full text-white flex items-center justify-center bg-green-500"
          onClick={() => setShow(!show)}
        >
          <FaBars className="text-xl" />
        </div>
        <SidebarMobile isOpen={show} />

        {!show && (
          <div className="w-screen px-2 py-10">
            <div className="flex w-full bg-white flex-col space-y-5 rounded-lg border px-5 mt-2 shadow mx-auto">
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  createCategory(data);
                  reset();
                })}
                className="flex w-full flex-col space-y-5"
              >
                <div className="mt-4 space-y-3">
                  <h1 className=" text-3xl font-bold text-gray-700">
                    Category
                  </h1>
                </div>
                <div>
                  <div>
                    <input
                      placeholder="Add Category"
                      className="focus:border-none focus:ring-green-500 h-12 w-full rounded-md bg-gray-100 px-3 border-gray-300"
                      type="text"
                      id="category"
                      name="label"
                      {...register("label", {
                        required: "category is required",
                      })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-green-600 py-3 font-bold text-white"
                >
                  Add
                </button>
              </form>
              <div className=" border-t"></div>
              <div>
                <ul>
                  {categories?.categories.map((item, i) => (
                    <li className="flex justify-between px-2 py-1 " key={i}>
                      <div className="text-lg text-gray-600">{item.label}</div>
                      <button
                        className="bg-green-200  py-1.5 px-4 rounded-lg text-green-600 text-center text-sm"
                        onClick={() => handleDeleteConfirmation(item._id)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
