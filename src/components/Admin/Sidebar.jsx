import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logo.webp";
import clsx from "clsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    // <div id="sidebar">
    //   <div className="logo">
    //     <img src={logo} />
    //     <h1>TechyDeals</h1>
    //   </div>
    //   <Link to={"/"}>
    //     <MdHome />
    //     Home
    //   </Link>
    //   <Link to={"/admin/dashboard"}>
    //     <MdDashboard />
    //     Dashboard
    //   </Link>

    //   <TreeNode label="Products">
    //     <div className="subTree">
    //       <Link to={"/admin/products"}>
    //         {" "}
    //         <span>
    //           {" "}
    //           <MdAddChart /> All{" "}
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="subTree">
    //       <Link to={"/admin/product/new"}>
    //         <span>
    //           <MdOutlineCreate /> Create
    //         </span>
    //       </Link>
    //     </div>
    //     <div className="subTree">
    //       <Link to={"/admin/product/new/category"}>
    //         <span>
    //           <MdOutlineCategory /> Category
    //         </span>
    //       </Link>
    //     </div>
    //   </TreeNode>
    //   <Link to={"/admin/orders"}>
    //     <MdLibraryBooks />
    //     Orders
    //   </Link>
    //   <Link to={"/admin/users"}>
    //     <MdPeople />
    //     Users
    //   </Link>
    //   <Link to={"/admin/reviews"}>
    //     <MdRateReview />
    //     Reviews
    //   </Link>
    // </div>
    <div className="w-64 hidden md:flex bg-gray-100 relative">
      <div className="h-screen w-full pb-10 sticky top-0 shadow-md">
        <div className="flex h-screen flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5">
          <div className="flex mt-8 items-center px-4">
            <img
              className="h-12 w-auto max-w-full rounded-full align-middle"
              src={logo}
              alt=""
            />
            <div className="flex ml-3 flex-col">
              <h3 className="text-xl">TechyDeals</h3>
            </div>
          </div>
          <Link
            to={"/"}
            title=""
            className="flex mt-10 text-gray-600 cursor-pointer items-center  focus:border-l-green-600 hover:border-l-4 hover:border-l-green-600 py-2 px-4 text-sm font-medium focus:text-green-600 hover:text-green-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
          >
            <svg
              className="mr-4 h-5 w-5 align-middle"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                className=""
              />
            </svg>
            Home
          </Link>
          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
            Analytics
          </span>
          <div className="flex mt-3 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                <Link
                  to={"/admin/dashboard"}
                  title=""
                  className={clsx(
                    "flex cursor-pointer items-center text-gray-600 focus:border-l-green-600 hover:border-l-4 hover:border-l-green-600 py-2 px-4 text-sm font-medium focus:text-green-600 hover:text-green-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4",
                    location.pathname === "/admin/dashboard" &&
                      "text-green-600 border-l-green-600 border-l-4"
                  )}
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                  </svg>
                  Dashboard
                </Link>
                <a
                  href="#"
                  className="flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4"
                >
                  <span className="flex mr-5 w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  Analytics
                </a>
              </nav>
              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                Product Mangement
              </span>
              <nav className="flex-1">
                <div className="relative transition">
                  <input
                    className="peer hidden"
                    type="checkbox"
                    id="menu-1"
                    defaultChecked=""
                  />
                  <button
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="flex peer relative w-full items-center border-l-green-600 pt-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        className=""
                      />
                    </svg>
                    Products
                    <label
                      htmlFor="menu-1"
                      className="absolute inset-0 h-full w-full cursor-pointer"
                    />
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                      "absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-hover:text-green-600",
                      isOpen && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <ul
                    className={clsx(
                      "duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl bg-gray-100 font-medium transition-all duration-300 peer-checked:max-h-96",
                      isOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <Link
                      to={"/admin/products"}
                      className={clsx(
                        "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                        location.pathname === "/admin/products" &&
                          "text-green-600 border-l-green-600 border-l-4"
                      )}
                    >
                      <span className="mr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            d="M21 6V18C21 19.0609 20.5786 20.0783 19.8284 20.8284C19.0783 21.5786 18.0609 22 17 22H7C5.93913 22 4.92178 21.5786 4.17163 20.8284C3.42149 20.0783 3 19.0609 3 18V14.89C3 11.4714 4.35811 8.1928 6.77545 5.77545C9.1928 3.35811 12.4714 2 15.89 2H17C18.0609 2 19.0783 2.42149 19.8284 3.17163C20.5786 3.92178 21 4.93913 21 6Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M3 15.06C3 9.9 8.50004 14.0599 11.73 10.8199C14.96 7.57995 10.83 2 15.98 2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M7 16H17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M15 12H17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M16 8H17"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      All
                    </Link>
                    <Link
                      to={"/admin/product/new"}
                      className={clsx(
                        "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                        location.pathname === "/admin/product/new" &&
                          "text-green-600 border-l-green-600 border-l-4"
                      )}
                    >
                      <span className="mr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M21 21H12"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Create
                    </Link>
                    <Link
                      to={"/admin/product/new/category"}
                      className={clsx(
                        "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                        location.pathname === "/admin/product/new/category" &&
                          "text-green-600 border-l-green-600 border-l-4"
                      )}
                    >
                      <span className="mr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            d="M12 7.82001H22"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M2 7.82001H4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M20 16.82H22"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M2 16.82H12"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M8 11.82C10.2091 11.82 12 10.0291 12 7.82001C12 5.61087 10.2091 3.82001 8 3.82001C5.79086 3.82001 4 5.61087 4 7.82001C4 10.0291 5.79086 11.82 8 11.82Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M16 20.82C18.2091 20.82 20 19.0291 20 16.82C20 14.6109 18.2091 12.82 16 12.82C13.7909 12.82 12 14.6109 12 16.82C12 19.0291 13.7909 20.82 16 20.82Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Category
                    </Link>
                  </ul>
                </div>
                <Link
                  to={"/admin/orders"}
                  className={clsx(
                    "flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                    location.pathname === "/admin/orders" &&
                      "text-green-600 border-l-green-600 border-l-4"
                  )}
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Orders
                </Link>
              </nav>
              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                User Management
              </span>
              <nav className="flex-1">
                <Link
                  to={"/admin/users"}
                  className={clsx(
                    "flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                    location.pathname === "/admin/users" &&
                      "text-green-600 border-l-green-600 border-l-4"
                  )}
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />{" "}
                    <path
                      d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Users
                </Link>
                <Link
                  to={"/admin/reviews"}
                  className={clsx(
                    "flex mb-10 cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                    location.pathname === "/admin/reviews" &&
                      "text-green-600 border-l-green-600 border-l-4"
                  )}
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M20 12V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H6.5C5.11929 21 4 19.8807 4 18.5V18.5C4 17.1193 5.11929 16 6.5 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12V7C20 5.11438 20 4.17157 19.4142 3.58579C18.8284 3 17.8856 3 16 3H8C6.11438 3 5.17157 3 4.58579 3.58579C4 4.17157 4 5.11438 4 7V18.5" />
                  </svg>
                  Reviews
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

export const SidebarMobile = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            x: "-100%",
          }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2 }}
          id="sidebarMobile"
        >
          <div className="w-screen flex md:hidden bg-gray-100 relative">
            <div className="h-screen w-full sticky top-0">
              <div className="flex h-screen flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
                <div className="flex mt-2 items-center px-4">
                  <img
                    className="h-12 w-auto max-w-full rounded-full align-middle"
                    src={logo}
                    alt=""
                  />
                  <div className="flex ml-3 flex-col">
                    <h3 className="text-xl">TechyDeals</h3>
                  </div>
                </div>
                <Link
                  to={"/"}
                  title=""
                  className="flex mt-10 cursor-pointer items-center  focus:border-l-green-600 hover:border-l-4 hover:border-l-green-600 py-2 px-4 text-sm font-medium focus:text-green-600 hover:text-green-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4"
                >
                  <svg
                    className="mr-4 h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      className=""
                    />
                  </svg>
                  Home
                </Link>
                <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                  Analytics
                </span>
                <div className="flex mt-3 flex-1 flex-col">
                  <div className="">
                    <nav className="flex-1">
                      <a
                        href={"/admin/dashboard"}
                        title=""
                        className={clsx(
                          "flex cursor-pointer items-center text-gray-600 focus:border-l-green-600 hover:border-l-4 hover:border-l-green-600 py-2 px-4 text-sm font-medium focus:text-green-600 hover:text-green-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4",
                          location.pathname === "/admin/dashboard" &&
                            "text-green-600 border-l-green-600 border-l-4"
                        )}
                      >
                        <svg
                          className="mr-4 h-5 w-5 align-middle"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </svg>
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4"
                      >
                        <span className="flex mr-5 w-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </span>
                        Analytics
                      </a>
                    </nav>
                    <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                      Product Mangement
                    </span>
                    <nav className="flex-1">
                      <div className="relative transition">
                        <input
                          className="peer hidden"
                          type="checkbox"
                          id="menu-1"
                          defaultChecked=""
                        />
                        <button
                          onClick={() => {
                            setOpen(!open);
                          }}
                          className="flex peer relative w-full items-center border-l-green-600 pt-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600 focus:border-l-4"
                        >
                          <svg
                            className="mr-4 h-5 w-5 align-middle"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                              className=""
                            />
                          </svg>
                          Products
                          <label
                            htmlFor="menu-1"
                            className="absolute inset-0 h-full w-full cursor-pointer"
                          />
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={clsx(
                            "absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-hover:text-green-600",
                            open && "rotate-180"
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        <ul
                          className={clsx(
                            "duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl bg-gray-100 font-medium transition-all duration-300 peer-checked:max-h-96",
                            open ? "max-h-96" : "max-h-0"
                          )}
                        >
                          <a
                            href={"/admin/products"}
                            className={clsx(
                              "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                              location.pathname === "/admin/products" &&
                                "text-green-600 border-l-green-600 border-l-4"
                            )}
                          >
                            <span className="mr-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  d="M21 6V18C21 19.0609 20.5786 20.0783 19.8284 20.8284C19.0783 21.5786 18.0609 22 17 22H7C5.93913 22 4.92178 21.5786 4.17163 20.8284C3.42149 20.0783 3 19.0609 3 18V14.89C3 11.4714 4.35811 8.1928 6.77545 5.77545C9.1928 3.35811 12.4714 2 15.89 2H17C18.0609 2 19.0783 2.42149 19.8284 3.17163C20.5786 3.92178 21 4.93913 21 6Z"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M3 15.06C3 9.9 8.50004 14.0599 11.73 10.8199C14.96 7.57995 10.83 2 15.98 2"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M7 16H17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M15 12H17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M16 8H17"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            All
                          </a>
                          <a
                            href={"/admin/product/new"}
                            className={clsx(
                              "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                              location.pathname === "/admin/product/new" &&
                                "text-green-600 border-l-green-600 border-l-4"
                            )}
                          >
                            <span className="mr-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M21 21H12"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            Create
                          </a>
                          <a
                            href={"/admin/product/new/category"}
                            className={clsx(
                              "flex m-2 cursor-pointer border-l-green-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-green-600",
                              location.pathname ===
                                "/admin/product/new/category" &&
                                "text-green-600 border-l-green-600 border-l-4"
                            )}
                          >
                            <span className="mr-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  d="M12 7.82001H22"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M2 7.82001H4"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M20 16.82H22"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M2 16.82H12"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M8 11.82C10.2091 11.82 12 10.0291 12 7.82001C12 5.61087 10.2091 3.82001 8 3.82001C5.79086 3.82001 4 5.61087 4 7.82001C4 10.0291 5.79086 11.82 8 11.82Z"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M16 20.82C18.2091 20.82 20 19.0291 20 16.82C20 14.6109 18.2091 12.82 16 12.82C13.7909 12.82 12 14.6109 12 16.82C12 19.0291 13.7909 20.82 16 20.82Z"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            Category
                          </a>
                        </ul>
                      </div>
                      <a
                        href={"/admin/orders"}
                        className={clsx(
                          "flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                          location.pathname === "/admin/orders" &&
                            "text-green-600 border-l-green-600 border-l-4"
                        )}
                      >
                        <svg
                          className="mr-4 h-5 w-5 align-middle"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        Orders
                      </a>
                    </nav>
                    <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
                      User Management
                    </span>
                    <nav className="flex-1">
                      <a
                        href={"/admin/users"}
                        className={clsx(
                          "flex cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                          location.pathname === "/admin/users" &&
                            "text-green-600 border-l-green-600 border-l-4"
                        )}
                      >
                        <svg
                          className="mr-4 h-5 w-5 align-middle"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Users
                      </a>
                      <a
                        href={"/admin/reviews"}
                        className={clsx(
                          "flex mb-10 cursor-pointer items-center border-l-green-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-green-600 hover:text-green-600 focus:border-l-4",
                          location.pathname === "/admin/reviews" &&
                            "text-green-600 border-l-green-600 border-l-4"
                        )}
                      >
                        <svg
                          className="mr-4 h-5 w-5 align-middle"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M20 12V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H6.5C5.11929 21 4 19.8807 4 18.5V18.5C4 17.1193 5.11929 16 6.5 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12V7C20 5.11438 20 4.17157 19.4142 3.58579C18.8284 3 17.8856 3 16 3H8C6.11438 3 5.17157 3 4.58579 3.58579C4 4.17157 4 5.11438 4 7V18.5" />
                        </svg>
                        Reviews
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
