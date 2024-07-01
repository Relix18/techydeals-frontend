import { useEffect, useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";
import { Controller, useForm } from "react-hook-form";
import { FaBars } from "react-icons/fa";
import {
  useCreateProductMutation,
  useGetProductCategoryQuery,
} from "../../redux/api/product";
import toast from "react-hot-toast";
import Loader from "../utils/Loader";
import clsx from "clsx";

const Create = () => {
  const [previewImage, setPreviewImage] = useState([]);
  const [previewThumb, setPreviewThumb] = useState(null);
  const [show, setShow] = useState(false);
  const { data: categories } = useGetProductCategoryQuery();
  const [createProduct, { error, isSuccess, isLoading }] =
    useCreateProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    isSuccess && toast.success("Product Created Successfully");
  }, [isSuccess]);

  useEffect(() => {
    const value = [];
    previewImage.forEach((item) => {
      value.push(item);
    });
    setValue("images", value);
  }, [previewImage, setValue]);

  const handleThumb = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewThumb(reader.result);
        setValue("thumbnail", reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewThumb(null);
    }
  };
  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImage([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div id="Create" className="flex bg-gray-100">
      <Sidebar />
      <div
        id="toggleBtn"
        className=" md:hidden z-50 absolute right-5 top-5 w-10 h-10 rounded-full text-white flex items-center justify-center bg-green-500"
        onClick={() => setShow(!show)}
      >
        <FaBars className="text-xl" />
      </div>
      <SidebarMobile isOpen={show} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!show && (
            <div className="w-screen px-2 py-10">
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  createProduct(data);
                  reset();
                  setPreviewImage([]);
                  setPreviewThumb(null);
                })}
                className="relative border  border-gray-100 space-y-3 w-full mx-auto rounded-xl bg-white p-6 shadow-xl lg:p-4"
              >
                <h1 className="mb-6 text-xl font-semibold lg:text-2xl">
                  Create New Product
                </h1>

                <div>
                  <label className=""> Name </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    id="name"
                    className="mt-2  focus:border-none focus:ring-green-500 h-12 w-full rounded-md bg-gray-100 px-3 border-gray-300"
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                </div>
                <div>
                  <label className=""> Description </label>
                  <textarea
                    placeholder="Product Description"
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    className="mt-2 h-32 w-full rounded-md focus:border-none focus:ring-green-500 bg-gray-100 px-3 border-gray-300 resize-none"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className=""> Category </label>

                    <select
                      id="category"
                      {...register("category", {
                        required: "category is required",
                      })}
                      className="mt-2 h-12 flex w-full rounded-md focus:border-none focus:ring-green-500 select-none border p-2 px-3 bg-gray-100 border-gray-300 text-gray-700 ring-green-400 "
                    >
                      {categories &&
                        categories.categories.map((category) => (
                          <option value={category.value}>
                            {category.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className=""> Price (in Rupee) </label>
                    <input
                      type="number"
                      placeholder="Price"
                      id="price"
                      {...register("price", {
                        required: "price is required",
                      })}
                      className="mt-2 h-12 w-full rounded-md focus:border-none focus:ring-green-500 bg-gray-100 px-3 border-gray-300"
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className=""> Discount Percentage </label>
                    <input
                      type="tel"
                      maxLength={2}
                      placeholder="Discount Percentage"
                      className="mt-2 h-12 w-full rounded-md focus:border-none focus:ring-green-500 bg-gray-100 px-3 border-gray-300"
                      id="discountPercentage"
                      {...register("discountPercentage", {
                        required: "discount is required",
                      })}
                    />
                  </div>
                  <div>
                    <label className=""> Stock </label>
                    <input
                      type="number"
                      id="stock"
                      placeholder="Stock"
                      {...register("stock", {
                        required: "stock is required",
                      })}
                      className="mt-2 h-12 w-full rounded-md focus:border-none focus:ring-green-500 bg-gray-100 px-3 border-gray-300"
                    />
                  </div>
                </div>
                <div className="main-col">
                  <div className="select">
                    <Controller
                      control={control}
                      name="thumbnail"
                      rules={{ required: "Thumbnail is required" }}
                      render={({ field }) => (
                        <div className="file">
                          <div
                            id="image-preview"
                            className={clsx(
                              "max-w-lg p-6 mb-4 bg-gray-100  rounded-lg items-center mx-auto text-center cursor-pointer",
                              !previewThumb &&
                                "border-dashed border-2 border-gray-400"
                            )}
                          >
                            <input
                              id="upload"
                              type="file"
                              className="hidden"
                              name="thumbnail"
                              accept="image/*"
                              onChange={(e) => {
                                field.onChange(e);
                                handleThumb(e);
                              }}
                            />
                            <label htmlFor="upload" className="cursor-pointer">
                              {previewThumb ? (
                                <img
                                  src={previewThumb}
                                  className="max-h-48 rounded-lg mx-auto"
                                />
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                  </svg>
                                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                    Upload Thumbnail
                                  </h5>
                                  <p className="font-normal text-sm text-gray-400 md:px-6">
                                    Choose photo size should be less than{" "}
                                    <b className="text-gray-600">2mb</b>
                                  </p>
                                  <p className="font-normal text-sm text-gray-400 md:px-6">
                                    and should be in{" "}
                                    <b className="text-gray-600">
                                      JPG, PNG, or GIF
                                    </b>{" "}
                                    format.
                                  </p>
                                  <span
                                    id="filename"
                                    className="text-gray-500 bg-gray-200 z-50"
                                  />
                                </>
                              )}
                            </label>
                            {errors.thumbnail && (
                              <p className="flex items-center justify-center text-rose-600  animate-scale-infinite ">
                                {errors.thumbnail.message}*
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  </div>
                  <div className="select">
                    <Controller
                      control={control}
                      name="images"
                      rules={{ required: "Images is required" }}
                      render={({ field }) => (
                        <div className="file">
                          <div
                            id="image-preview"
                            className={clsx(
                              "max-w-lg overflow-auto p-6 mb-4 bg-gray-100  rounded-lg items-center mx-auto text-center cursor-pointer",
                              previewImage.length === 0 &&
                                "border-dashed border-2 border-gray-400"
                            )}
                          >
                            <input
                              id="images"
                              accept="image/*"
                              type="file"
                              name="images"
                              className="hidden"
                              multiple
                              onChange={(e) => {
                                field.onChange(e);
                                handleFile(e);
                              }}
                            />

                            <label htmlFor="images" className="cursor-pointer">
                              <div className="flex">
                                {previewImage.map((image, index) => (
                                  <img
                                    className="max-h-48 rounded-lg mx-auto"
                                    key={index}
                                    src={image}
                                    alt="avatar"
                                  />
                                ))}
                              </div>

                              {previewImage.length === 0 && (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                  </svg>
                                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                    Upload Images (Multiple)
                                  </h5>
                                  <p className="font-normal text-sm text-gray-400 md:px-6">
                                    Choose photo size should be less than{" "}
                                    <b className="text-gray-600">2mb</b>
                                  </p>
                                  <p className="font-normal text-sm text-gray-400 md:px-6">
                                    and should be in{" "}
                                    <b className="text-gray-600">
                                      JPG, PNG, or GIF
                                    </b>{" "}
                                    format.
                                  </p>
                                  <span
                                    id="filename"
                                    className="text-gray-500 bg-gray-200 z-50"
                                  />
                                </>
                              )}
                            </label>
                            {errors.images && (
                              <p className="flex items-center justify-center text-rose-600  animate-scale-infinite ">
                                {errors.images.message}*
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="mt-5 w-full rounded-md bg-green-600 p-2 text-center font-semibold text-white"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Create;
