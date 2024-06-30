import { configureStore } from "@reduxjs/toolkit";
import { product } from "./api/product";
import { user } from "./api/user";
import { cart } from "./api/cart";
import auth from "./reducer/auth";
import { order } from "./api/order";

export const store = configureStore({
  reducer: {
    product: product.reducer,
    user: user.reducer,
    cart: cart.reducer,
    auth: auth,
    order: order.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    product.middleware,
    user.middleware,
    cart.middleware,
    order.middleware,
  ],
});
