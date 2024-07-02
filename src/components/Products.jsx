import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link, useSearchParams } from "react-router-dom";
import {
  useGetProductCategoryQuery,
  useGetProductsQuery,
} from "../redux/api/product";
import { selectCurrentUser } from "../redux/reducer/auth";
import { useSelector } from "react-redux";
import { useAddCartMutation, useGetCartQuery } from "../redux/api/cart";
import toast from "react-hot-toast";
import clsx from "clsx";
import Pagination from "react-js-pagination";
import Loader from "./utils/Loader";

const subCategories = [{ name: "New Arrivals", href: "?newArrival=true" }];

export default function Products() {
  const [open, setOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [searchParams] = useSearchParams();
  const currentUser = useSelector(selectCurrentUser);
  let keyword = searchParams.get("search");
  const cat = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const newArrival = searchParams.get("newArrival");
  const currentUrl = window.location.href;

  useEffect(() => {
    const url = window.location.href; // or any specific URL you want to update
    const updatedUrl = updateUrlWithSortParams(url, sortBy, sortOrder);

    window.history.pushState({ path: updatedUrl }, "", updatedUrl);
  }, [sortBy, sortOrder]);

  const sortOptions = [
    {
      name: "Best Rating",
      sortBy: "ratings",
      sortOrder: "desc",
      current: false,
    },
    {
      name: "Price: Low to High",
      sortBy: "price",
      sortOrder: "asc",
      current: false,
    },
    {
      name: "Price: High to Low",
      sortBy: "price",
      sortOrder: "desc",
      current: false,
    },
    { name: "A to Z", sortBy: "name", sortOrder: "asc", current: false },
    { name: "Z to A", sortBy: "name", sortOrder: "desc", current: false },
    { name: "Reset Sort", sortBy: null, sortOrder: null, current: false },
  ];

  const updateUrlWithSortParams = (url, sortBy, sortOrder) => {
    const urlObj = new URL(url);
    if (sortBy && sortOrder) {
      urlObj.searchParams.set("sortBy", sortBy);
      urlObj.searchParams.set("sortOrder", sortOrder);
    } else {
      urlObj.searchParams.delete("sortBy");
      urlObj.searchParams.delete("sortOrder");
    }
    return urlObj.toString();
  };

  const setCurrentPage = (e) => {
    setCurrentPageNo(e);
  };

  const newkeyword = () => {
    if (keyword === null) {
      return (keyword = "");
    } else {
      return keyword;
    }
  };

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const query = {
    category: cat,
    keyword: newkeyword(),
    newArrival,
    sortBy,
    sortOrder,
    page: currentPageNo,
  };

  const { data, isLoading } = useGetProductsQuery(query);
  const { data: category } = useGetProductCategoryQuery();
  const { data: items } = useGetCartQuery();
  const [addItem] = useAddCartMutation();

  const addToCartHandler = (product) => {
    if (currentUser) {
      if (items.cart.findIndex((i) => i.product._id === product._id) < 0) {
        const newItem = { productId: product._id, quantity: 1 };
        addItem(newItem);
        toast.success("Added To Cart");
      } else {
        toast.error("Item Already Added");
      }
    } else {
      toast.error("Please Login First");
    }
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <Link
                                to="?newArrival=true"
                                onClick={() => setMobileFiltersOpen(false)}
                                className="font-medium text-gray-900"
                              >
                                New Arrivals
                              </Link>
                            </Disclosure.Button>
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Category
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {category?.categories.map((option, optionIdx) => (
                                <Link
                                  to={`?category=${option.value}`}
                                  key={option.value}
                                  onClick={() => setMobileFiltersOpen(false)}
                                  className="flex items-center"
                                >
                                  <div
                                    htmlFor={`filter-mobile-${option.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="mx-auto items-center mt-5 max-w-screen-md leading-6">
            <form className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-md border shadow-lg ">
              <svg
                className="absolute left-2 block h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx={11} cy={11} r={8} className="" />
                <line x1={21} y1={21} x2="16.65" y2="16.65" className="" />
              </svg>
              <input
                type="name"
                id="search"
                name="search"
                className="h-14 w-full rounded-md py-4 pr-20 pl-12 outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Search products by name"
              />
              <button
                type="submit"
                className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-lg bg-green-500 px-5 md:px-10 font-medium text-white focus:ring-4 hover:bg-green-600"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              to={updateUrlWithSortParams(
                                currentUrl,
                                option.sortBy,
                                option.sortOrder
                              )}
                              className={clsx(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-8 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className=" py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <Link to={category.href} className="block py-3">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Category
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {category?.categories.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <Link
                                to={`?category=${option.value}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {data?.products.map((product) => (
                      <div
                        key={product._id}
                        className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                      >
                        <Link
                          className="relative mx-3 mt-3 flex h-32 sm:h-60 overflow-hidden rounded-xl"
                          to={`/product/${product._id}`}
                        >
                          <img
                            className="peer absolute top-0 right-0 h-full w-full object-contain"
                            src={product.thumbnail.url}
                            alt="product image"
                          />
                          <img
                            className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                            src={product.images[0].url}
                            alt="product image"
                          />
                          <svg
                            className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="currentColor"
                              d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                            />
                          </svg>
                          {product.newArrival && (
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                              New
                            </span>
                          )}{" "}
                        </Link>
                        <div className="mt-4 px-5 pb-5">
                          <Link to={`/product/${product._id}`}>
                            <h5 className="text:md sm:text-xl line-clamp-1 tracking-tight text-slate-900">
                              {product.name}
                            </h5>
                          </Link>
                          <div className="mt-2 mb-5 flex items-center justify-between">
                            <p>
                              <span className="text-md sm:text-lg md:text-2xl font-bold text-slate-900">
                                {priceFormat.format(
                                  Math.round(
                                    product.price -
                                      (product.price *
                                        product.discountPercentage) /
                                        100
                                  )
                                )}
                              </span>
                              <span className="sm:flex block text-sm text-slate-900 line-through sm:pl-2">
                                {priceFormat.format(product.price)}
                              </span>
                            </p>
                          </div>
                          <button
                            onClick={() => addToCartHandler(product)}
                            className=" whitespace-nowrap w-full flex items-center justify-center rounded-md bg-green-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {data?.products.length === 0 && (
                  <div className="flex items-center justify-center text-2xl">
                    No Item Found
                  </div>
                )}
                {data?.products.length !== 0 && (
                  <>
                    <div className="hidden sm:flex px-8 pt-16 justify-end">
                      <Pagination
                        activePage={currentPageNo}
                        itemsCountPerPage={data?.resultPerPage}
                        totalItemsCount={data?.productCount}
                        onChange={setCurrentPage}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        innerClass="flex rounded-md overflow-hidden shadow-md"
                        itemClass="text-gray-500 py-1 hover:bg-green-300"
                        linkClass="text-gray-700 px-2 py-2 "
                        pageRangeDisplayed={5}
                        activeClass="bg-green-500"
                        activeLinkClass="text-white"
                      />
                    </div>
                    <div className="flex sm:hidden px-8 pt-16 justify-center">
                      <Pagination
                        activePage={currentPageNo}
                        itemsCountPerPage={data?.resultPerPage}
                        totalItemsCount={data?.productCount}
                        onChange={setCurrentPage}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        innerClass="flex"
                        itemClass="text-gray-500 py-0 px-1 shadow-md hover:bg-green-300"
                        linkClass="text-gray-700 px-1 py-1 "
                        pageRangeDisplayed={5}
                        activeClass="bg-green-500"
                        activeLinkClass="text-white"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
