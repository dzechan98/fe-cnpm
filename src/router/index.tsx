import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cart, DetailProduct, Home } from "../pages";
import { ROUTES } from "./constant";
import { CartProvider } from "../contexts/CartContext";
import { UserProvider } from "../contexts/UserContext";

const useAppRouter = () => {
  return createBrowserRouter([
    {
      element: <Home />,
      path: ROUTES.home,
    },
    {
      element: <Cart />,
      path: ROUTES.cart,
    },
    {
      element: <DetailProduct />,
      path: ROUTES.detailProduct,
    },
  ]);
};

export const Router: React.FC = () => {
  const appRouter = useAppRouter();

  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={appRouter} />;
      </CartProvider>
    </UserProvider>
  );
};
