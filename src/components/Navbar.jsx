import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.webp";
import {
  ChevronDownIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { FaBox } from "react-icons/fa6";
import { MdFiberNew } from "react-icons/md";
import Cart from "./Cart";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../redux/api/cart";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducer/auth";

const products = [
  {
    name: "All Products",
    description: "Check out our amazing products",
    href: "/products",
    icon: FaBox,
  },
  {
    name: "New Arrivals",
    description: "Check what’s new",
    href: "/products?newArrival=true",
    icon: MdFiberNew,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useSelector(selectCurrentUser);

  const { data: cart } = useGetCartQuery();

  const navigate = useNavigate();

  const loginHandler = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 left-0 z-10 shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <div className="text-xl uppercase tracking-widest">TechyDeals</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                {({ close }) => (
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        onClick={close}
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            to="products?category=laptop"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Laptop
          </Link>
          <Link
            to="products?category=smartphone"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Smartphone
          </Link>
          <Link
            to="products?category=headphone"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Headphone
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:gap-x-12 lg:justify-end">
          <div
            onClick={() => setOpen(!open)}
            className="relative text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            <div className="absolute z-10 bg-white rounded-full h-4 w-4 flex items-center justify-center -right-1 -top-1">
              {cart?.cart.length || 0}
            </div>
            <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div
            onClick={loginHandler}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            <UserIcon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      </nav>
      <Transition appear show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-10" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to={"/"} className="-m-1.5 p-1.5 flex gap-2">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto rounded-full" src={logo} alt="" />
                  <p className="text-xl font-bold">TechyDeals</p>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Product
                            <ChevronDownIcon
                              className={classNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5 flex-none"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products].map((item) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to={"products?category=gadgets"}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Gadgets
                    </Link>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to={"products?category=fashion"}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Fashion
                    </Link>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to={"products?category=gifts"}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Gifts
                    </Link>
                  </div>
                  <div className="py-6 flex gap-4">
                    <div
                      onClick={() => setOpen(!open)}
                      className="relative -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="absolute z-10 bg-white rounded-full h-4 w-4 flex items-center justify-center right-2 top-2">
                        {cart?.cart.length || 0}
                      </div>
                      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div
                      onClick={loginHandler}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      <Cart open={open} setOpen={setOpen} />
    </header>
  );
}
