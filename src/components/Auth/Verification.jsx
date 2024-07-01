import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import { useVerifyUserQuery } from "../../redux/api/user";

const Verification = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { id, token } = useParams();

  const data = {
    id,
    token,
  };

  const { data: user, isSuccess, isError, error } = useVerifyUserQuery(data);

  useEffect(() => {
    if (isSuccess) {
      setValidUrl(true);
    }
    if (isError) {
      setValidUrl(false);
    }
  }, [isSuccess, isError, user, error]);

  return (
    <>
      {validUrl ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="my-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex items-center justify-center gap-5">
              <div className="rounded-full h-10 w-10 overflow-hidden">
                <img src={logo} />
              </div>
              TechyDeals
            </h1>

            <div className="w-20 h-20 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-green-800"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              Your account has been verified.
            </h2>
            <div>
              <Link
                to={"/login"}
                className="mt-20 flex w-full items-center justify-center uppercase rounded-md bg-green-600 px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Verification;
