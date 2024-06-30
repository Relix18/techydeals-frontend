import StarRatings from "react-star-ratings";
import profile from "../assets/placeholder.jpg";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAddReviewMutation } from "../redux/api/product";

export const Reviews = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <ReviewModal isOpen={openModal} closeModal={() => setOpenModal(false)} />

      <div className="lg:col-span-1 block mt-8 lg:mt-14 lg:hidden">
        <p className="text-xl font-bold  py-2">Customer Reviews</p>
        <div className="flex flex-col">
          <StarRatings
            name="rating"
            numberOfStars={5}
            starRatedColor="#ffd700"
            rating={data.ratings}
            starDimension="25px"
            starSpacing="0px"
          />
          <p className="ml-2 text-lg font-semibold py-2">
            {data.ratings} out of 5
          </p>
        </div>
        <div className="border-t border-gray-300 mt-4">
          <p className="text-xl font-bold py-2">Review this product</p>
          <p className="py-2 text-gray-500">
            Write something you like about this product
          </p>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="text-green-500 shadow-md border rounded-md px-4 py-2 w-full"
          >
            Write a product review
          </button>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 lg:border-none lg:mt-0">
        {data.review?.length === 0 && (
          <p className="text-center text-2xl">No reviews yet</p>
        )}
        {data.review?.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 py-5 flex items-center gap-5"
          >
            <img
              src={profile}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="flex gap-4 flex-col">
              <StarRatings
                name="rating"
                numberOfStars={5}
                starRatedColor="#ffd700"
                rating={review.rating}
                starDimension="18px"
                starSpacing="0px"
              />

              <p className="text-gray-500">{review.comment}</p>
              <p className="italic"> - {review.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AddReview = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ReviewModal isOpen={openModal} closeModal={() => setOpenModal(false)} />
      <div className="lg:col-span-1 hidden mt-14 lg:block">
        <p className="text-xl font-bold  py-2">Customer Reviews</p>
        <div className="flex flex-col">
          <StarRatings
            name="rating"
            numberOfStars={5}
            starRatedColor="#ffd700"
            rating={product.ratings}
            starDimension="25px"
            starSpacing="0px"
          />
          <p className="ml-2 text-lg font-semibold py-2">
            {product.ratings} out of 5
          </p>
        </div>
        <div className="border-t border-gray-300 mt-4">
          <p className="text-xl font-bold py-2">Review this product</p>
          <p className="py-2 text-gray-500">
            Write something you like about this product
          </p>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="text-green-500 rounded-md border shadow-md px-4 py-2 w-full"
          >
            Write a product review
          </button>
        </div>
      </div>
    </>
  );
};

const ReviewModal = ({ isOpen, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams();

  const [review, { error, isError }] = useAddReviewMutation();

  const submitHandler = () => {
    const id = params.id;
    if (rating < 1) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment) {
      toast.error("Please enter a comment");
      return;
    }
    review({ productId: id, rating, comment });
    if (error) {
      toast.error(isError.data.message);
      return;
    }
    closeModal();
    toast.success("Thank you for your review");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  Write a review
                </Dialog.Title>
                <div className="mt-2">
                  <StarRatings
                    name="rating"
                    numberOfStars={5}
                    changeRating={(e) => setRating(e)}
                    starHoverColor="#ffd700"
                    starRatedColor="#ffd700"
                    starDimension="30px"
                    rating={rating}
                    starSpacing="0px"
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    placeholder="Write your review here"
                    className="w-full resize-none h-[8rem] rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium focus:border-none focus:outline-none focus-visible:ring-green-500 "
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="mt-4 w-full gap-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent w-full bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
