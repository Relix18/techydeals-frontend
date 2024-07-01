import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCancelOrderMutation } from "../redux/api/order";

const Success = () => {
  const orderDetail = sessionStorage.orderDetail;
  const data = JSON.parse(orderDetail);
  const { id } = useParams();
  const [cancelOrder] = useCancelOrderMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteConfirmed = () => {
    cancelOrder(id);
    setIsOpen(false);
  };

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 "
                      onClick={handleDeleteConfirmed}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
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
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="w-20 h-20 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-green-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Order Successful
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
            Thanks for making a purchase you can check your order summary.
          </p>
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span className="text-green-600 font-medium">
                    #{data.orderId}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Payment Method :
                  <span className="text-gray-400 font-medium">
                    {" "}
                    {data.paymentMethod === "online"
                      ? "Online"
                      : "Cash On Delievery"}
                  </span>
                </p>
              </div>
              <Link
                to={"/orders"}
                replace={true}
                className="flex justify-center items-center rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-green-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-700 hover:shadow-indigo-400"
              >
                Order Summary
              </Link>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              {data?.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                >
                  <div className="img-box max-lg:w-full">
                    <img
                      src={item.product.thumbnail.url}
                      alt={item.product.name}
                      className="aspect-square w-full lg:max-w-[140px]"
                    />
                  </div>
                  <div className="flex flex-row items-center w-full ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                            {item.product.name}
                          </h2>
                          <p className="font-normal text-lg leading-8 text-gray-500 ">
                            {item.product.category}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              price
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-green-600">
                              {priceFormat.format(
                                Math.floor(
                                  item.product.price -
                                    (item.product.price *
                                      item.product.discountPercentage) /
                                      100
                                ) * item.quantity
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-blue-100 text-blue-600">
                              {data.orderStatus}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex flex-wrap gap-0 md:gap-3 lg:block">
                            <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time:{" "}
                            </p>
                            <p className="font-medium text-base whitespace-nowrap leading-7 text-emerald-500">
                              23rd March 2021
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full border-t border-gray-200 px-2 lg:px-6 flex flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex outline-0 py-6 sm:pr-6  border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-md md:text-lg text-black bg-white transition-all duration-500 hover:text-red-500"
                >
                  <svg
                    className="stroke-black lg:block hidden transition-all duration-500 group-hover:stroke-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                      stroke=""
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Cancel Order
                </button>
              </div>
              <p className="font-semibold flex flex-wrap justify-end text-md md:text-lg text-black ">
                Total Price:{" "}
                <span className="text-green-600">
                  {" "}
                  {priceFormat.format(data.total)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
