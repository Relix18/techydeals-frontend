import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "../redux/api/cart";
import { selectCurrentUser } from "../redux/reducer/auth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Cart = ({ open, setOpen }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { data: cart } = useGetCartQuery();
  const [deleteCart] = useDeleteCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const totalDiscount = cart?.cart.reduce(
    (acc, item) =>
      acc +
      Math.floor(
        item.product.price -
          (item.product.price * item.product.discountPercentage) / 100
      ) *
        item.quantity,
    0
  );

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const increment = (itemId) => {
    cart?.cart.map((item) => {
      if (item._id === itemId._id && item.product.stock > item.quantity) {
        return updateCart({ id: itemId._id, quantity: item.quantity + 1 });
      }
    });
  };

  const decrement = (itemId) => {
    cart?.cart.map((item) => {
      if (item._id === itemId._id && item.quantity > 1) {
        return updateCart({ id: itemId._id, quantity: item.quantity - 1 });
      }
    });
  };

  const handleDelete = (id) => {
    deleteCart(id);
  };

  const handleCheckout = () => {
    if (cart?.cart.length > 0) {
      navigate("/checkout");
    } else {
      toast.error("Cart is empty");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart?.cart.length > 0 ? (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart?.cart.map((i) => (
                                <li key={i._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={i.product.thumbnail.url}
                                      alt={i.product.title}
                                      className="h-full w-full object-contain object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className="line-clamp-1">
                                          <Link
                                            to={`/product/${i.product._id}`}
                                          >
                                            {i.product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {priceFormat.format(
                                            Math.floor(
                                              i.product.price -
                                                (i.product.price *
                                                  i.product
                                                    .discountPercentage) /
                                                  100
                                            ) * i.quantity
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                                          {i.product.category}
                                        </p>
                                        <p className="ml-4 line-through text-gray-400">
                                          {priceFormat.format(
                                            i.product.price * i.quantity
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex flex-wrap">
                                        <p className="text-gray-500 pr-2">
                                          Qty:
                                        </p>
                                        <div className="flex flex-row">
                                          <button
                                            onClick={() => decrement(i)}
                                            className="px-2 border-2"
                                          >
                                            -
                                          </button>
                                          <span className="px-2">
                                            {i.quantity}{" "}
                                          </span>
                                          <button
                                            onClick={() => increment(i)}
                                            className="px-2 border-2"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-green-600 hover:text-green-500"
                                          onClick={() => handleDelete(i._id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div>
                              {!currentUser ? (
                                <p className="text-center font-bold text-gray-500">
                                  {" "}
                                  Login to view cart
                                </p>
                              ) : (
                                <p>No items in cart</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {currentUser && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{priceFormat.format(totalDiscount)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6" onClick={() => setOpen(false)}>
                          <button
                            onClick={handleCheckout}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
