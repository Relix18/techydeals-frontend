import clsx from "clsx";
import {
  useCancelOrderMutation,
  useGetOrderDetailsQuery,
} from "../../redux/api/order";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order } = useGetOrderDetailsQuery(id);
  const [cancelOrder] = useCancelOrderMutation();
  const [isOpen, setIsOpen] = useState(false);

  const discountPrice = order?.order.items.reduce(
    (acc, item) =>
      acc +
      Math.floor(
        item.product.price -
          (item.product.price * item.product.discountPercentage) / 100
      ) *
        item.quantity,
    0
  );
  const shipping = discountPrice > 500 ? 0 : 50;
  const total = discountPrice + shipping;

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleDeleteConfirmed = () => {
    cancelOrder(id);
    setIsOpen(false);
  };

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
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none"
                      onClick={handleDeleteConfirmed}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
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
      <div className="relative mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
        <div className="relative mx-auto my-10 grid max-w-lg gap-6 md:max-w-full lg:gap-10">
          <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
            <div className="flex flex-1 flex-col justify-between p-2 lg:py-7 lg:px-5">
              {order?.order && (
                <div className="px-4 py-2 sm:px-8 sm:py-2">
                  <p
                    className={clsx(
                      "flex text-lg font-semibold text-gray-500",
                      {
                        "text-green-500":
                          order.order.orderStatus === "Delivered",
                        "text-red-500": order.order.orderStatus === "Cancelled",
                        "text-yellow-500":
                          order.order.orderStatus === "Shipped",
                        "text-blue-500":
                          order.order.orderStatus === "Processing",
                      }
                    )}
                  >
                    Order ID: {order.order.orderId}
                  </p>
                  <div className="flow-root">
                    <ul className="-my-2">
                      {order?.order.items.map((item) => (
                        <li
                          key={item._id}
                          className="flex py-6 text-left flex-row space-x-5 space-y-0"
                        >
                          <div className="shrink-0 relative">
                            <img
                              className="h-24 w-24 max-w-full rounded-lg object-contain"
                              src={item.product.thumbnail.url}
                              alt=""
                            />
                          </div>
                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="">
                                <p className="text-base font-semibold text-gray-900">
                                  {item.product.name}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  {item.product.category}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
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
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 space-y-1 border-t border-b py-8">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Order Status</p>
                      <p
                        className={clsx("font-bold text-center", {
                          "text-green-500":
                            order.order.orderStatus === "Delivered",
                          "text-red-500":
                            order.order.orderStatus === "Cancelled",
                          "text-yellow-500":
                            order.order.orderStatus === "Shipped",
                          "text-blue-500":
                            order.order.orderStatus === "Processing",
                        })}
                      >
                        {order.order.orderStatus}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Order Confirmed</p>
                      <p className=" font-semibold text-gray-900">
                        {format(new Date(order.order.createdAt), "dd/MM/yyyy")}
                      </p>
                    </div>
                    {order.order.orderStatus === "Delivered" && (
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400">Delivered On</p>
                        <p className=" font-semibold text-gray-900">
                          {format(
                            new Date(order.order.updatedAt),
                            "dd/MM/yyyy"
                          )}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Total</p>
                      <p className=" font-semibold text-gray-900">
                        {priceFormat.format(total)}
                      </p>
                    </div>
                  </div>
                  {order.order.orderStatus === "Shipped" ||
                    (order.order.orderStatus === "Processing" && (
                      <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex mt-2 justify-center rounded-md border border-transparent w-full bg-red-200 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        Cancel Order
                      </button>
                    ))}
                  <div className="mt-6 flex flex-col items-start">
                    <h1 className=" text-gray-400 mb-4 text-lg">
                      Shipping Details
                    </h1>
                    <p className="mt-2 font-semibold text-lg mb-2">
                      {order?.order.shippingInfo.name}
                    </p>
                    <p className="text-slate-500 text-sm leading-6">
                      {order?.order.shippingInfo.street}
                    </p>
                    <p className="text-slate-500 text-sm leading-6">
                      {order?.order.shippingInfo.city}
                    </p>
                    <p className="text-slate-500 text-sm leading-6">
                      {order?.order.shippingInfo.state} -{" "}
                      {order?.order.shippingInfo.zip}
                    </p>
                    <p className="text-slate-500 text-sm leading-6">
                      Phone number: {order?.order.shippingInfo.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
