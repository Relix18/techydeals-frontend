import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/api/user";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/reducer/auth";
import { useEffect } from "react";

const MyAccount = () => {
  const [userLogout] = useLogoutUserMutation();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signout = () => {
    userLogout();
    window.location.reload();
  };

  return (
    <section className="py-12 text-green-900 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        {/* Admin Dashboard */}

        {user?.role === "admin" && (
          <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
            <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
              <div className="flex-1">
                <p className="border-green-500 px-10 text-xl font-black">
                  Admin Dashboard
                </p>
                <blockquote className="mt-8 flex-1">
                  <p className="leading-relaxed text-green-900">
                    Welcome {user?.name}
                  </p>
                </blockquote>
              </div>
              <div className="-mx-5 mt-8 px-8 py-1">
                <div className="">
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Account */}
        <div className="flex flex-col items-center">
          <div className="relative mx-auto my-20 grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
            <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
              <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                <div className="flex-1">
                  <p className="border-green-500 px-10 text-xl font-black">
                    Login & Security
                  </p>
                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-green-900">
                      Edit login, name, password and email settings.
                    </p>
                  </blockquote>
                </div>
                <div className="-mx-5 mt-8 px-8 py-1">
                  <div className="">
                    <Link
                      to="/account/edit"
                      className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
              <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                <div className="flex-1">
                  <p className="border-green-500 px-10 text-xl font-black">
                    Your Orders
                  </p>
                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-green-900">
                      Track your orders and see details about them.
                    </p>
                  </blockquote>
                </div>
                <div className="-mx-5 mt-8 px-8 py-1">
                  <div className="">
                    <Link
                      to="/orders"
                      className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Check Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
              <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                <div className="flex-1">
                  <p className="border-green-500 px-10 text-xl font-black">
                    Your Addresses
                  </p>
                  <blockquote className="mt-8 flex-1">
                    <p className="leading-relaxed text-green-900">
                      Edit your saved addresses or add a new one.
                    </p>
                  </blockquote>
                </div>
                <div className="-mx-5 mt-8 px-8 py-1">
                  <div className="">
                    <Link
                      to="/account/address"
                      className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Edit Address
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button
            onClick={signout}
            className="inline-flex justify-center rounded-md border border-transparent w-full bg-red-200 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
