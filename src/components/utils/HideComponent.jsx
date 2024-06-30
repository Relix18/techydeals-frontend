import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const HideComponents = ({ children }) => {
  const location = useLocation();

  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const hidePaths = [
      "/login",
      "/signup",
      "/forget-password",
      "/checkout",
      "/reset-password",
      "/change-password",
      "/admin/dashboard",
      "/admin/products",
      "/admin/product/new",
      "/admin/product/new/category",
      "/admin/orders",
      "/admin/users",
      "/admin/reviews",
    ];

    if (
      hidePaths.includes(location.pathname) ||
      location.pathname.startsWith("/product/edit/") ||
      location.pathname.startsWith("/admin/order/") ||
      location.pathname.startsWith("/admin/user/") ||
      location.pathname.startsWith("/success/") ||
      location.pathname.startsWith("/users/")
    ) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [location]);

  return <div>{showComponent && children}</div>;
};

export const HideFooter = ({ children }) => {
  const location = useLocation();

  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    if (
      location.pathname === "/account/edit/email" ||
      location.pathname === "/account/edit" ||
      location.pathname === "/account/edit/name" ||
      location.pathname === "/account/edit/password" ||
      location.pathname === "/account/address"
    ) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [location]);

  return <div>{showComponent && children}</div>;
};
