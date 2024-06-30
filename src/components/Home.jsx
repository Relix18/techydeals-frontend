import { LuMouse } from "react-icons/lu";
import main from "../assets/main1.webp";
import main2 from "../assets/about.webp";
import cover from "../assets/covers.webp";
import {
  TruckIcon,
  RectangleStackIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { PiHeadsetLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useGetNewProductsQuery,
  useGetProductsQuery,
} from "../redux/api/product";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/reducer/auth";
import toast from "react-hot-toast";
import { useAddCartMutation, useGetCartQuery } from "../redux/api/cart";

const links = [
  { name: "Laptop", href: "products?category=laptop" },
  { name: "Smartphone", href: "products?category=smartphone" },
  { name: "Headphone", href: "products?category=headphone" },
  { name: "Speaker", href: "products?category=speaker" },
];

const features = [
  {
    name: "Wide Selection of Mobile Accessories",
    description:
      "We carry a wide selection of mobile accessories, including phone cases, tempered glass screen protectors, charging cables, and more. Whatever your mobile accessory needs may be, we have you covered.",
    icon: RectangleStackIcon,
  },
  {
    name: "Fast Shipping",
    description:
      "We know that when you order a product, you want it as soon as possible. That’s why we offer fast and reliable shipping options to ensure that your products arrive on time.",
    icon: TruckIcon,
  },
  {
    name: "Affordable Prices",
    description:
      "We believe that everyone should have access to high-quality mobile accessories at affordable prices. That’s why we offer competitive pricing on all of our products.",
    icon: CurrencyRupeeIcon,
  },
  {
    name: "Excellent Customer Service",
    description:
      "At TECHY DEALS, we are dedicated to providing our customers with excellent customer service. If you have any questions or concerns, our friendly and knowledgeable team is always here to help.",
    icon: PiHeadsetLight,
  },
];

export default function Home() {
  const { data, error, isError, isLoading } = useGetNewProductsQuery();
  const currentUser = useSelector(selectCurrentUser);
  const { data: products } = useGetProductsQuery({ category: "" });

  const newProduct = data?.newArrivals.slice(0, 4);
  const featuredProduct = products?.products.slice(0, 4);
  console.log(featuredProduct);

  const priceFormat = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const [addItem] = useAddCartMutation();
  const { data: items } = useGetCartQuery();

  const addToCartHandler = (product) => {
    if (currentUser) {
      console.log(currentUser);
      if (items?.cart.findIndex((i) => i.product._id === product._id) < 0) {
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

  const posts = [
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 2,
      title: "Boost your conversion rate",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      id: 3,
      title: "Boost your conversion rate",
      href: "#",
      description:
        "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      category: { title: "Marketing", href: "#" },
      author: {
        name: "Michael Foster",
        role: "Co-Founder / CTO",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    // More posts...
  ];

  return (
    <>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={main}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-80"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your One-Stop Mobile Shop
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex justify-center md:justify-normal text-base font-semibold leading-7">
              <Link
                className="text-base font-semibold leading-7 text-black bg-white py-2.5 px-5 hover:bg-white/80"
                to={"/products"}
              >
                All Products
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="hidden grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link key={link.name} className="cursor-pointer" to={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
            <dl className=" flex justify-center">
              <LuMouse className="h-10 w-10 text-white animate-[wiggle_1s_ease-in-out_infinite]" />
            </dl>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      {newProduct?.length === 0 ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-3xl underline tracking-tight text-gray-900">
              Featured Products
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {featuredProduct?.map((product) => (
                <div
                  key={product._id}
                  className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <a
                    className="relative mx-3 mt-3 flex h-32 sm:h-60 overflow-hidden rounded-xl"
                    href={`/product/${product._id}`}
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
                  </a>
                  <div className="mt-4 px-5 pb-5">
                    <a href={`/product/${product._id}`}>
                      <h5 className="text-md sm:text-xl line-clamp-1 tracking-tight text-slate-900">
                        {product.name}
                      </h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-md sm:text-xl font-bold text-slate-900">
                          {priceFormat.format(
                            Math.floor(
                              product.price -
                                (product.price * product.discountPercentage) /
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
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-3xl underline tracking-tight text-gray-900">
              New Arrivals
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {newProduct?.map((product) => (
                <div
                  key={product._id}
                  className="group flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                >
                  <a
                    className="relative mx-3 mt-3 flex h-32 sm:h-60 overflow-hidden rounded-xl"
                    href={`/product/${product._id}`}
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
                  </a>
                  <div className="mt-4 px-5 pb-5">
                    <a href={`/product/${product._id}`}>
                      <h5 className="text-md sm:text-xl line-clamp-1 tracking-tight text-slate-900">
                        {product.name}
                      </h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-md sm:text-xl font-bold text-slate-900">
                          {priceFormat.format(
                            Math.floor(
                              product.price -
                                (product.price * product.discountPercentage) /
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
                        className="mr-2 h-6 w-6 hidden sm:block"
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
            {data && data.newArrivals.length > 4 && (
              <Link
                to={"/products?newArrival=true"}
                className=" flex justify-end mt-5 text-xl underline tracking-tight text-gray-900"
              >
                Show More
              </Link>
            )}
          </div>
        </div>
      )}
      {/* About */}
      <div className="overflow-hidden bg-white py-8 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4 flex items-center">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-green-600">
                  ABOUT US
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  TECHY DEALS - Your Ultimate Mobile Accessory Destination
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At TECHY DEALS, we are passionate about providing our
                  customers with the latest and greatest mobile accessories.
                  From stylish phone cases to tempered glass screen protectors,
                  we have everything you need to protect and enhance your mobile
                  experience. Our mission is to be your one-stop-shop for all
                  things mobile.
                </p>
                <dl className="mt-10 max-w-xl underline underline-offset-4 font-bold uppercase space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <Link to="/about">Read More </Link>
                </dl>
              </div>
            </div>
            <img
              src={main2}
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 hidden md:block sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
      {/* Facilities */}
      <div className="bg-white py-8 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl lg:text-center">
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Shop with Confidence
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At TECHY DEALS, we are committed to providing our customers with
              the highest quality products at competitive prices. Our products
              are carefully curated to ensure that they meet our standards for
              quality, durability, and style.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="relative min-h-[40rem] items-center justify-center flex isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={cover}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-70"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
            <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              Your Satisfaction is Our Priority
            </h2>
            <p className="mt-6 text-lg leading-8 text-white">
              At TECHY DEALS, our mission is to provide our customers with the
              best possible shopping experience. From our wide selection of
              high-quality products to our excellent customer service, we are
              committed to your satisfaction. Shop with us today and discover
              why TECHY DEALS is the ultimate mobile accessory destination.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-center gap-x-6 text-base font-semibold leading-7 text-white ">
              <Link
                to={"/products?category=headphone"}
                className=" bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm hover:bg-white/60"
              >
                Headphone
              </Link>
              <Link
                to={"/products?category=speaker"}
                className="bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm hover:bg-white/60"
              >
                Speaker
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className="bg-white min-h-[30rem] flex justify-center items-center">
        <div className="mx-auto max-w-6xl py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:mx-0 flex flex-col items-center">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Our Customers speak for us
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="group relative">
                  <p className="mt-5 line-clamp-6 italic text-lg leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-black uppercase">
                      - {post.author.name}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
