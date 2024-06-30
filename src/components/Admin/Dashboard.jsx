import { useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";
import { TbClipboardList } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LinearScale,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useGetAdminProductsQuery } from "../../redux/api/product";
import { useGetAllOrdersQuery } from "../../redux/api/order";
import { useGetAllUsersQuery } from "../../redux/api/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Dashboard = () => {
  const { data: products } = useGetAdminProductsQuery();
  const { data: orders } = useGetAllOrdersQuery();
  const { data: users } = useGetAllUsersQuery();
  const [show, setShow] = useState(false);

  let totalAmount = 0;

  orders &&
    orders.orders.forEach((element) => {
      totalAmount += element.total;
    });

  let outOfScock = 0;
  let stock = 0;

  products &&
    products.products.forEach((element) => {
      if (element.stock === 0) {
        outOfScock += 1;
      } else {
        stock += 1;
      }
    });

  const lineData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "rgba(75,192,192,0.4)",
        hoverBackgroundColor: "red",
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutData = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#f02828", "#2874f0"],
        hoverBackgroundColor: ["#ff0000", "#0062ff"],
        data: [outOfScock, stock],
      },
    ],
  };

  return (
    <div id="dashboard" className="flex bg-gray-100">
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
        <div className="text-slate-600 w-full mx-auto grid grid-cols-2 gap-y-4 px-4 py-1 sm:my-10 ">
          <div className="col-span-2 col-start-1 flex flex-col justify-between border-b py-3 sm:flex-row">
            <p className="text-2xl">Dashboard</p>
          </div>
          <div className="col-span-2 -mx-4 bg-gradient-to-t from-green-400 to-green-600 px-4 py-8 sm:col-span-1 sm:mx-0 sm:rounded-xl sm:py-4">
            <p className="mb-4 font-medium text-xl text-indigo-100">
              Total Amount
            </p>
            <div className="mb-6 flex max-w-xs">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-400 sm:mr-3 sm:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div className="px-4">
                <p className="mb-1 text-2xl font-black text-white">
                  ₹ {totalAmount}
                </p>
                <p className="font-medium text-indigo-100">
                  {" "}
                  Orders: {orders?.orders.length}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-10 justify-between bg-gray-100 rounded-xl">
              <Line data={lineData} />
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4 py-4 sm:col-span-1 sm:gap-8 sm:px-4">
            <Link
              to={"/admin/products"}
              className="flex flex-col items-center justify-center shadow-lg shadow-blue-100 bg-white p-4 rounded-lg hover:scale-105 transition-all duration-500"
            >
              <BsBoxSeam className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" />

              <p className="mt-4 text-xl font-medium">Products</p>
              <p className="mt-2 text-xl font-medium">
                {products?.products.length}
              </p>
            </Link>
            <Link
              to={"/admin/orders"}
              className="flex flex-col items-center justify-center shadow-lg shadow-blue-100 bg-white p-4 rounded-lg hover:scale-105 transition-all duration-500"
            >
              <TbClipboardList className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" />

              <p className="mt-4 text-xl font-medium">Orders</p>
              <p className="mt-2 text-xl font-medium">
                {orders?.orders.length}
              </p>
            </Link>
            <Link
              to={"/admin/users"}
              className="flex flex-col col-span-2 items-center shadow-lg shadow-blue-100 hover:scale-105 transition-all duration-500"
            >
              <div className="flex w-full max-w-full h-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                <div className="p-3 flex flex-row items-center justify-between h-full">
                  <CiUser className="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" />
                  <div className="p-1 text-right">
                    <p className=" font-normal text-xl capitalize">Users</p>
                    <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
                      {users?.users.length}
                    </h4>
                  </div>
                </div>
                <hr className="opacity-50" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
