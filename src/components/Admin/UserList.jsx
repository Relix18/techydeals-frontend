import React, { Fragment, useMemo, useState } from "react";
import Sidebar, { SidebarMobile } from "./Sidebar";
import { MdDelete, MdEdit } from "react-icons/md";
import { usePagination, useSortBy, useTable } from "react-table";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/user";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";
import Loader from "../utils/Loader";

const UserList = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const data = useMemo(() => users?.users || [], [users]);
  const secure = import.meta.env.VITE_SECURE_MAIL;

  const columns = React.useMemo(
    () => [
      {
        Header: "UserId",
        accessor: "_id",
      },

      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },

      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex">
            <Link to={`/admin/user/${row.original._id}`}>
              <MdEdit className="m-1 h-6 w-6 hover:text-green-600 hover:cursor-pointer" />
            </Link>
            <MdDelete
              className="m-1 h-6 w-6 hover:text-green-600 hover:cursor-pointer"
              onClick={() =>
                handleDeleteConfirmation(row.original._id, row.original.email)
              }
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleDeleteConfirmation = (userId, userEmail) => {
    setSelectedUserId({ userId, userEmail });
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (selectedUserId.userEmail === secure) {
      setDeleteConfirmationOpen(false);
      setSelectedUserId(null);
      toast.error("You cannot delete creator account.");
    }
    if (selectedUserId.userId && selectedUserId.userEmail !== secure) {
      deleteUser(selectedUserId);
      setDeleteConfirmationOpen(false);
      setSelectedUserId(null);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Transition appear show={isDeleteConfirmationOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDeleteConfirmationOpen(false)}
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none "
                      onClick={() => handleDeleteConfirmed()}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setDeleteConfirmationOpen(false)}
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
      {users && (
        <div id="userList" className="flex bg-gray-100 h-screen">
          <Sidebar />
          <div
            id="toggleBtn"
            className=" md:hidden z-50 absolute right-5 top-5 w-10 h-10 rounded-full text-white flex items-center justify-center bg-green-500"
            onClick={() => setShow(!show)}
          >
            <FaBars className="text-xl" />
          </div>
          <SidebarMobile isOpen={show} />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!show && (
                <div className="w-screen bg-gray-100">
                  <div className="mx-auto max-w-screen-xl px-2 py-10">
                    <div className="mt-2 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                      <div className="mt-4 mb-2 space-y-3">
                        <h1 className=" text-3xl font-bold text-gray-700">
                          All Users
                        </h1>
                      </div>
                      <div className="border-b md:hidden"></div>
                      <input
                        type="text"
                        placeholder="Search User Name"
                        id="name"
                        onChange={(e) => setSearch(e.target.value)}
                        className="mt-4 hidden md:flex focus:border-none focus:ring-green-500 h-12 w-full rounded-md bg-gray-100 px-3 border-gray-300"
                      />
                      <table
                        className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2"
                        {...getTableProps()}
                      >
                        <thead className="hidden border-b md:table-header-group">
                          {headerGroups.map((headerGroup) => (
                            <tr
                              key={headerGroup.id}
                              {...headerGroup.getHeaderGroupProps()}
                            >
                              {headerGroup.headers.map((column) => (
                                <td
                                  className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3"
                                  key={column.id}
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  {column.render("Header")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody
                          {...getTableBodyProps()}
                          className="bg-white lg:border-gray-300"
                        >
                          {page
                            .filter((row) =>
                              search.toLowerCase() === ""
                                ? row
                                : row.original.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            )
                            .map((row) => {
                              prepareRow(row);
                              return (
                                <tr
                                  className=""
                                  key={row.id}
                                  {...row.getRowProps()}
                                >
                                  {row.cells.map((cell) => (
                                    <td
                                      key={cell.id}
                                      {...cell.getCellProps()}
                                      className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left md:table-cell"
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          {users?.users.map((user, i) => (
                            <tr className="mobile" key={i}>
                              <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                <div className="mt-1 flex flex-col text-xs font-medium md:hidden">
                                  <div className="flex items-center">
                                    Id: {user._id}
                                  </div>
                                  <div className="">Name:{user.name}</div>
                                  <div className="">Email: {user.email}</div>
                                  <div className="">Role: {user.role}</div>
                                </div>
                              </td>

                              <td className="whitespace-no-wrap w-32 text-right text-sm text-gray-600 sm:px-3 lg:text-left md:hidden">
                                <Link
                                  className="bg-green-500 hover:bg-green-600 py-1.5 px-6 rounded-lg text-white text-center text-sm lg:hidden"
                                  to={`/admin/user/${user._id}`}
                                >
                                  Edit
                                </Link>
                                <button
                                  className="bg-green-200  py-1.5 px-4 mt-2 rounded-lg text-green-600 text-center text-sm lg:hidden"
                                  onClick={() =>
                                    handleDeleteConfirmation(
                                      user._id,
                                      user.email
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center">
                    <button
                      disabled={!canPreviousPage}
                      className={clsx(
                        "md:py-2 py-1 md:m-2 m-1  px-2 md:px-4 text-sm md:text-base text-gray-700 hover:text-green-600 font-light bg-white shadow-sm rounded-md ",
                        canPreviousPage
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      )}
                      onClick={() => gotoPage(0)}
                    >
                      First
                    </button>
                    <button
                      className={clsx(
                        "md:py-2 py-1 md:m-2 m-0  px-2 md:px-4 text-sm md:text-base text-gray-700 hover:text-green-600 font-light bg-white shadow-sm rounded-md",
                        canPreviousPage
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      )}
                      disabled={!canPreviousPage}
                      onClick={previousPage}
                    >
                      Prev
                    </button>
                    <p className="text-sm md:text-base text-gray-700 mx-2">
                      {pageIndex + 1} of {pageCount}
                    </p>
                    <button
                      className={clsx(
                        "md:py-2 py-1 md:m-2 m-1 px-2 md:px-4 text-sm md:text-base text-gray-700 hover:text-green-600 font-light bg-white shadow-sm rounded-md",
                        canNextPage ? "cursor-pointer" : "cursor-not-allowed"
                      )}
                      disabled={!canNextPage}
                      onClick={nextPage}
                    >
                      Next
                    </button>
                    <button
                      className={clsx(
                        "md:py-2 py-1 md:m-2 m-0  px-2 md:px-4 text-sm md:text-base text-gray-700 hover:text-green-600 font-light bg-white shadow-sm rounded-md",
                        canNextPage ? "cursor-pointer" : "cursor-not-allowed"
                      )}
                      disabled={!canNextPage}
                      onClick={() => gotoPage(pageCount - 1)}
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserList;
