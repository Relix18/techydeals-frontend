import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/reducer/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../redux/api/user";

const EditName = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [updateUser] = useUpdateProfileMutation();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    setValue("name", user?.name);
  }, [user, navigate, setValue]);

  const onSubmit = (data) => {
    updateUser(data);
    navigate("/account/edit");
  };

  return (
    <section className="py-12 text-green-900 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-screen-sm px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col rounded-xl shadow-xl border-t-4 border-green-300 shadow-green-200">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center font-bold text-xl leading-9 tracking-tight text-gray-900">
                Change your name
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      {...register("name", { required: true })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex tracking-widest w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  >
                    Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditName;
