import { useEffect, useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBars } from "react-icons/fa";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/order";
import clsx from "clsx";
import { format } from "date-fns";
import toast from "react-hot-toast";

const OrderUpdate = () => {
  const params = useParams();
  const { data: order } = useGetOrderDetailsQuery(params.id);
  const [updateOrder, { isSuccess }] = useUpdateOrderMutation();
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(order);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated");
    }
  }, [isSuccess]);

  return (
    <>
      <div id="orderUpdate" className="flex bg-gray-100">
        <Sidebar />
        <div
          id="toggleBtn"
          className=" md:hidden z-50 absolute right-5 top-5 w-10 h-10 rounded-full text-white flex items-center justify-center bg-green-500"
          onClick={() => setShow(!show)}
        >
          <FaBars className="text-xl" />
        </div>
        <SidebarMobile isOpen={show} />

        {!show && (
          <div className="w-screen bg-gray-100">
            {order && (
              <div className="mx-auto max-w-screen-xl px-2 py-10">
                <div className="mt-2 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                  <div className="mt-4 mb-2 space-y-3">
                    <h1
                      className={clsx(
                        "md:text-3xl font-bold",
                        order.order.orderStatus === "Processing" &&
                          "text-blue-400",
                        order.order.orderStatus === "Delivered" &&
                          "text-green-500",
                        order.order.orderStatus === "Shipped" &&
                          "text-yellow-500",
                        order.order.orderStatus === "Canceled" && "text-red-500"
                      )}
                    >
                      #{order.order.orderId}
                    </h1>
                  </div>
                  <div className="border-b"></div>

                  {order?.order.items.map((item, i) => (
                    <>
                      <div className="flex justify-between gap-2" key={i}>
                        <div className=" py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                          <div className="mt-1 flex flex-col md:flex-row gap-4 text-md font-medium ">
                            <div className="flex items-center h-24 w-18">
                              <img
                                src={item.product.thumbnail.url}
                                alt={item.product.name}
                                className="h-24 w-18 overflow-hidden rounded-sm "
                              />
                            </div>
                            <div className="">
                              <div className="">Name:{item.product.name}</div>
                              <div className="">
                                Category: {item.product.category}
                              </div>
                              <div className="">Qty: {item.quantity}</div>
                            </div>
                          </div>
                        </div>
                        <div className="w-38 py-4 text-sm whitespace-nowrap text-right text-gray-600 sm:px-3 md:block flex flex-col items-end">
                          <div className="">
                            Price: ₹
                            {Math.floor(
                              item.product.price -
                                (item.product.price *
                                  item.product.discountPercentage) /
                                  100
                            )}
                          </div>

                          <div className="">
                            Price * Qty: ₹
                            {item.quantity *
                              Math.floor(
                                item.product.price -
                                  (item.product.price *
                                    item.product.discountPercentage) /
                                    100
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="border-t md:flex pb-4 justify-between gap-2">
                    <div className="whitespace-no-wrap pt-4 md:pt-4 text-left text-sm text-gray-600 sm:px-3 ">
                      <h1 className="font-bold text-lg">Summary</h1>
                      <div className="mt-1 flex flex-col text-sm font-medium">
                        <div className="flex items-center">
                          Total Amount: ₹{order.order.total}
                        </div>
                        <div className="">
                          Order Date:{" "}
                          {format(
                            new Date(order.order.createdAt),
                            "dd/MMMM/yyyy"
                          )}
                        </div>
                        <div
                          className={clsx(
                            "",
                            order.order.orderStatus === "Processing" &&
                              "text-blue-400",
                            order.order.orderStatus === "Delivered" &&
                              "text-green-500",
                            order.order.orderStatus === "Shipped" &&
                              "text-yellow-500",
                            order.order.orderStatus === "Canceled" &&
                              "text-red-500"
                          )}
                        >
                          Status: {order.order.orderStatus}
                        </div>
                        <div className="">
                          Total Amount: ₹{order.order.total}
                        </div>
                      </div>
                    </div>

                    <div className="whitespace-no-wrap md:text-right md:py-4 md:mt-8 text-sm text-gray-600 sm:px-3 ">
                      <div className="">
                        Payment Method:{" "}
                        {order.order.paymentMethod === "online"
                          ? "Online"
                          : "Cash on Delivery"}
                      </div>
                      <div
                        className={
                          order.order.paymentStatus === "Paid"
                            ? `text-green-500`
                            : `text-red-500`
                        }
                      >
                        Payment Status: {order.order.paymentStatus}
                      </div>
                      {order.order.orderStatus === "Delivered" && (
                        <div className="text-green-500">
                          Delivered Date:{" "}
                          {format(
                            new Date(order.order.updatedAt),
                            "dd/MMMM/yyyy"
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t md:flex pb-4 justify-between gap-2">
                    <div className="whitespace-no-wrap pt-4 md:pt-4 text-left text-sm text-gray-600 sm:px-3 ">
                      <h1 className="font-bold text-lg">Address</h1>
                      <div className="mt-1 flex flex-col text-sm font-medium">
                        <div className="flex items-center">
                          Name: {order.order.shippingInfo.name}
                        </div>
                        <div className="">
                          Phone: {order.order.shippingInfo.phone}
                        </div>
                        <div className="">
                          Street: {order.order.shippingInfo.street}
                        </div>
                      </div>
                    </div>

                    <div className="whitespace-no-wrap md:text-right md:py-4 md:mt-8 text-sm text-gray-600 sm:px-3 ">
                      <div className="">
                        City: {order.order.shippingInfo.city}
                      </div>
                      <div
                        className={
                          order.order.paymentStatus === "Paid"
                            ? `text-green-500`
                            : `text-red-500`
                        }
                      >
                        State: {order.order.shippingInfo.state}
                      </div>
                      <div className="">
                        <div className="">
                          Zip: {order.order.shippingInfo.zip}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b"></div>

                  <form
                    noValidate
                    onSubmit={handleSubmit(async (data) => {
                      if (data.status === "Status") {
                        return;
                      }
                      const status = {
                        id: params.id,
                        data,
                      };
                      updateOrder(status);
                      reset();
                    })}
                    className="flex w-full flex-col space-y-5 py-4"
                  >
                    <div className=" px-2">
                      <label className="text-lg font-bold text-gray-700">
                        {" "}
                        Update Status{" "}
                      </label>

                      <select
                        id="status"
                        {...register("status", {
                          required: "status is required",
                        })}
                        className="mt-2 h-12 flex w-full rounded-md focus:border-none focus:ring-green-500 select-none border p-2 px-3 bg-gray-100 border-gray-300 text-gray-700 ring-green-400 "
                      >
                        <option>Status</option>
                        <option value={"Cancelled"}>Cancel</option>
                        {order && order.order.orderStatus === "Processing" && (
                          <option value={"Shipped"}>Shipped</option>
                        )}
                        {order && order.order.orderStatus === "Shipped" && (
                          <option value={"Delivered"}>Delivered</option>
                        )}
                      </select>
                    </div>
                    <div className="px-2 w-full flex">
                      <button
                        disabled={
                          (order && order.order.orderStatus === "Delivered") ||
                          order?.order.orderStatus === "Cancelled"
                        }
                        type="submit"
                        className=" disabled:bg-gray-300 disabled:text-gray-700 disabled:cursor-not-allowed w-full rounded-lg bg-green-600 py-3 font-bold text-white"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderUpdate;
