import { useGetOrderQuery } from "../../redux/api/order";
import { format } from "date-fns";
import clsx from "clsx";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const { data } = useGetOrderQuery();

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="relative mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
      <div className="relative mx-auto my-10 grid max-w-lg gap-6 md:max-w-full lg:gap-10">
        <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
          <div className="flex flex-1 flex-col justify-between p-2 lg:py-7 lg:px-5">
            <div className="flex-1">
              <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                {data?.orders.length === 0 ? (
                  <h1 className="items-center justify-center w-full h-[25rem] text-lg font-bold flex">
                    No Order Found
                  </h1>
                ) : (
                  <>
                    <thead className="hidden border-b lg:table-header-group">
                      <tr className="">
                        <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                          Order Date
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Order ID
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Item Name
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Item
                        </td>

                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Price
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Status
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                          Action
                        </td>
                      </tr>
                    </thead>
                    <tbody className="bg-white lg:border-gray-300">
                      {data?.orders.map((order) => (
                        <tr className="" key={order._id}>
                          <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                            {format(new Date(order.createdAt), "dd/MMMM/yyyy")}
                            <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                              <div className="">Order Id: #{order.orderId}</div>
                              <div className="flex items-center gap-2">
                                {order.items.map((item) => (
                                  <img
                                    key={item.product._id}
                                    src={item.product.thumbnail.url}
                                    alt={item.product.title}
                                    className="h-18 w-12 overflow-hidden rounded-sm "
                                  />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            #{order.orderId}
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            {order.items.length > 1
                              ? order.items[0].product.name +
                                ` (+${order.items.length - 1}more)`
                              : order.items[0].product.name}
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                            {order.items.length > 1 ? (
                              <div className="flex items-center justify-center">
                                <img
                                  key={order.items[0].product._id}
                                  src={order.items[0].product.thumbnail.url}
                                  alt={order.items[0].product.title}
                                  className="h-12 w-12 overflow-hidden  rounded-full border object-contain"
                                />{" "}
                                {`+${order.items.length - 1}`}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                {order.items.map((item) => (
                                  <img
                                    key={item.product._id}
                                    src={item.product.thumbnail.url}
                                    alt={item.product.title}
                                    className="h-12 w-12 overflow-hidden rounded-full border object-contain"
                                  />
                                ))}
                              </div>
                            )}
                          </td>

                          <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                            {priceFormat.format(order.total)}
                            <span
                              className={clsx(
                                "my-3 ml-auto block w-fit whitespace-nowrap rounded-full  px-2 py-0.5 text-center text-xs  lg:hidden",
                                {
                                  "text-green-800 bg-green-200":
                                    order.orderStatus === "Delivered",
                                  "text-red-800 bg-red-200":
                                    order.orderStatus === "Cancelled",
                                  "text-yellow-800 bg-yellow-200":
                                    order.orderStatus === "Shipped",
                                  "text-blue-800 bg-blue-200":
                                    order.orderStatus === "Processing",
                                }
                              )}
                            >
                              {order.orderStatus}
                            </span>
                            <Link
                              to={`/order/${order._id}`}
                              className=" bg-green-500 hover:bg-green-600 py-1.5 px-5 rounded-lg text-white text-center text-sm lg:hidden"
                            >
                              View
                            </Link>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                            <span
                              className={clsx(
                                "ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800",
                                {
                                  "text-green-800 bg-green-200":
                                    order.orderStatus === "Delivered",
                                  "text-red-800 bg-red-200":
                                    order.orderStatus === "Cancelled",
                                  "text-yellow-800 bg-yellow-200":
                                    order.orderStatus === "Shipped",
                                  "text-blue-800 bg-blue-200":
                                    order.orderStatus === "Processing",
                                }
                              )}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="whitespace-no-wrap hidden py-4 text-md font-normal text-gray-500 sm:px-3 lg:table-cell">
                            <Link
                              to={`/order/${order._id}`}
                              className="bg-green-500 hover:bg-green-600 py-1.5 px-2.5 rounded-lg text-white"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
