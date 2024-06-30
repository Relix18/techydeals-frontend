import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useAddAddressMutation,
  useGetUserAddressQuery,
} from "../redux/api/user";
import { useState } from "react";
import { useGetCartQuery } from "../redux/api/cart";
import { toast } from "react-hot-toast";
import { useCreateOrderMutation } from "../redux/api/order";

const Checkout = () => {
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();

  const { data: Addresses } = useGetUserAddressQuery();
  const [newAddress] = useAddAddressMutation();
  const [createOrder] = useCreateOrderMutation();
  const { data: cart } = useGetCartQuery();

  const { register, handleSubmit, reset } = useForm();

  function generatePONumber() {
    const prefix = "PO";
    const sequentialNumber = Math.floor(Math.random() * 10000);
    const paddedSequentialNumber = String(sequentialNumber).padStart(4, "0");
    const year = new Date().getFullYear().toString().substr(-2);
    const month = new Date().getMonth().toString();
    const date = new Date().getDate().toString();
    const poNumber = `${prefix}${year}${month}${date}${paddedSequentialNumber}`;
    return poNumber;
  }

  const sum = cart?.cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalDiscount = cart?.cart.reduce(
    (acc, item) =>
      acc +
      item.product.price * item.quantity -
      Math.floor(
        item.product.price -
          (item.product.price * item.product.discountPercentage) / 100
      ) *
        item.quantity,
    0
  );

  const discountPrice = cart?.cart.reduce(
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
  const totalItems = cart?.cart.reduce(
    (amount, item) => item.quantity + amount,
    0
  );

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const addAddress = (data) => {
    newAddress(data);
    reset();
  };

  const handleAddress = (e) => {
    setAddress(Addresses?.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleProceed = async () => {
    if (!address || !payment) {
      toast.error("Please select an address and payment method");
      return;
    }

    if (payment === "online") {
      toast.error("Razorpay Payment Method will be added soon");
      return;
    }

    const orderId = generatePONumber();

    const orderDetail = {
      items: cart?.cart,
      total,
      totalItems,
      orderId,
      paymentMethod: payment,
      user: address.user,
      shippingInfo: address.address,
      orderStatus: "processing",
    };
    createOrder(orderDetail);

    sessionStorage.setItem("orderDetail", JSON.stringify(orderDetail));

    toast.success("Order Placed Successfully");

    const id = JSON.parse(sessionStorage?.orderDetail);

    navigate(`/success/${id.orderId}`, { replace: true });

    return;
  };

  return (
    <>
      {cart?.cart.length === 0 && <Navigate to="/" replace={true} />}
      <div className=" mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="bg-white py-2 px-5 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => addAddress(data))}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Delivery information
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
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
                    type="submit"
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing Addresses
                  </p>

                  <form className="mt-5 grid gap-6">
                    {Addresses?.addresses.map((item, index) => (
                      <div key={index} className="relative">
                        <input
                          className="peer hidden"
                          id={`radio_${index}`}
                          onChange={handleAddress}
                          value={index}
                          type="radio"
                          name="radio"
                          defaultChecked=""
                        />
                        <span className="peer-checked:border-green-500 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                        <label
                          className="peer-checked:border-2 peer-checked:border-green-500 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                          htmlFor={`radio_${index}`}
                        >
                          <div className="ml-5">
                            <span className="mt-2 font-semibold">
                              {item.address.name}
                            </span>
                            <p className="text-slate-500 text-sm leading-6">
                              {item.address.street}
                            </p>
                            <p className="text-slate-500 text-sm leading-6">
                              {item.address.city}
                            </p>
                            <p className="text-slate-500 text-sm leading-6">
                              {item.address.state} - {item.address.zip}
                            </p>

                            <p className="text-slate-500 text-sm leading-6">
                              Phone number: {item.address.phone}
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </form>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="online"
                            name="payments"
                            onChange={handlePayment}
                            value="online"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <label
                            htmlFor="online"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            value="cod"
                            onChange={handlePayment}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash On Delivery (COD)
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2 bg-[#e9e9e9]">
            <div className="mx-auto sticky top-0  mt-12 max-w-7xl px-2 sm:px-5 lg:px-5">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Order Summary
              </h1>
              <div className="px-0 py-6 sm:px-0">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart?.cart.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail.url}
                            alt={item.product.name}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-1">
                                <Link href={item.product._id}>
                                  {item.product.name}
                                </Link>
                              </h3>
                              <p className="ml-4">
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
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                                {item.product.category}
                              </p>
                              <p className="ml-4 text-gray-500 line-through">
                                {priceFormat.format(
                                  item.product.price * item.quantity
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty:</p>

                            <div className="flex">
                              <p>{item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-2 py-2 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-500">
                  <p>Subtotal</p>
                  <p>{priceFormat.format(sum)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-500">
                  <p>Discount</p>
                  <p> – {priceFormat.format(totalDiscount)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-500">
                  <p>Delivery Charge</p>
                  <p>{priceFormat.format(shipping)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{priceFormat.format(total)}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shopping upto ₹500 or more to get free delivery.
                </p>
                <div className="mt-6 cursor-pointer">
                  <div
                    onClick={handleProceed}
                    className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    Proceed
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to={"/"}>
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
