import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductCart from "../components/ProductCart";
import Products from "../components/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "cart",
        element: <ProductCart />,
      },
    ],
  },
]);
