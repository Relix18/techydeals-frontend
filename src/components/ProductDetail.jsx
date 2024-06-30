import { Carousel } from "react-responsive-carousel";
import { useGetProductQuery } from "../redux/api/product";
import { useParams } from "react-router-dom";
import Loader from "./utils/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import clsx from "clsx";
import { AddReview, Reviews } from "./Reviews";
import StarRatings from "react-star-ratings";

const ProductDetail = () => {
  const [tab, setTab] = useState("description");
  const { id } = useParams();

  const { data, error, isError, isLoading } = useGetProductQuery(id);

  const discount = Math.round(
    data?.product.price * (data?.product.discountPercentage / 100)
  );

  const finalPrice = Math.round(data?.product.price - discount);

  const priceFormat = new Intl.NumberFormat("en-in", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="py-12 sm:py-16">
          {data && (
            <div className="container mx-auto px-4">
              <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-0 lg:grid-cols-4 lg:gap-16">
                <div className="lg:col-span-2 lg:row-end-1">
                  <Carousel
                    autoPlay={true}
                    interval={2000}
                    showArrows={false}
                    infiniteLoop={true}
                    // showThumbs={false}
                    showStatus={false}
                    swipeable={true}
                    className="w-full h-full"
                  >
                    {data.product.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image.url}
                          alt="image"
                          className="w-full object-contain aspect-[16/9] "
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0"></div>
                </div>
                <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                  <h1 className=" text-2xl font-bold text-gray-900 sm:text-3xl">
                    {data.product.name}
                  </h1>
                  <h1 className="text-xl text-semibold text-gray-500 sm:text-xl">
                    {data.product.category}
                  </h1>
                  <div className="mt-5 flex items-center">
                    <div className="flex items-center">
                      <StarRatings
                        rating={data.product.ratings}
                        starRatedColor="orange"
                        starDimension="18px"
                        starSpacing="0px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-500">
                      {data.product.review.length} Reviews
                    </p>
                  </div>
                  <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                    <p className="mt-4 line-clamp-[10]">
                      {data.product.description}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                    <div className="flex items-end">
                      <h1 className="text-2xl font-bold pr-2">
                        {priceFormat.format(finalPrice)}
                      </h1>
                      <span className="text-base line-through">
                        {priceFormat.format(data.product.price)}
                      </span>
                      <span className="text-base text-red-500 ml-2">
                        {Math.round(data.product.discountPercentage).toFixed(0)}
                        % off
                      </span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 mr-3 h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="border-b border-gray-300">
                    <nav className="flex gap-0">
                      <button
                        value={"description"}
                        onClick={(e) => {
                          setTab(e.target.value);
                        }}
                        className={clsx(
                          " p-4 text-sm font-medium mr-0 relative after:-bottom-[2px] after:transition after:duration-200 after:ease-out after:left-0 after:absolute after:w-full after:h-0.5 after:scale-0 after:bg-black hover:after:scale-100 ",
                          tab === "description"
                            ? "border-b-2 border-gray-900"
                            : "border-b-2 border-transparent text-gray-600"
                        )}
                      >
                        {" "}
                        Description{" "}
                      </button>
                      <button
                        value={"reviews"}
                        onClick={(e) => {
                          setTab(e.target.value);
                        }}
                        className={clsx(
                          "inline-flex items-center p-4 text-sm font-medium mr-0 relative after:-bottom-[2px] after:transition after:duration-200 after:ease-out after:left-0 after:absolute after:w-full after:h-0.5 after:scale-0 after:bg-black hover:after:scale-100",
                          tab === "reviews"
                            ? "border-b-2 border-gray-900"
                            : "border-b-2 border-transparent text-gray-600"
                        )}
                      >
                        Reviews
                        <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                          {data.product.review.length}
                        </span>
                      </button>
                    </nav>
                  </div>

                  <div className="mt-0 flow-root sm:mt-12">
                    {tab === "description" ? (
                      <p className="mt-4">{data.product.description}</p>
                    ) : (
                      <Reviews data={data.product} />
                    )}
                  </div>
                </div>
                {tab === "reviews" && <AddReview product={data.product} />}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProductDetail;
