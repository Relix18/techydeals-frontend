import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/reducer/auth";
import { useEffect } from "react";

const EditProfile = () => {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="py-12 text-green-900 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-green-300 shadow-green-200">
          <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
            <div className="flex-1">
              <p className="border-green-500 px-10 text-xl font-black">
                Edit Profile
              </p>
              <blockquote className="mt-8 flex justify-between  items-center">
                <div className="flex flex-col items-start">
                  <p className="leading-relaxed text-green-900">Name</p>
                  <p className="leading-relaxed text-gray-500">{user?.name}</p>
                </div>
                <Link
                  to={"/account/edit/name"}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Edit
                </Link>
              </blockquote>
              <blockquote className="mt-8 flex justify-between  items-center">
                <div className="flex flex-col items-start">
                  <p className="leading-relaxed text-green-900">Email</p>
                  <p className="leading-relaxed text-gray-500">{user?.email}</p>
                </div>
                <Link
                  to={"/account/edit/email"}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Edit
                </Link>
              </blockquote>
              <blockquote className="mt-8 flex justify-between  items-center">
                <div className="flex flex-col items-start">
                  <p className="leading-relaxed text-green-900">Password</p>
                  <p className="leading-relaxed text-gray-500">●●●●●●●●</p>
                </div>
                <Link
                  to={"/change-password"}
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Edit
                </Link>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
