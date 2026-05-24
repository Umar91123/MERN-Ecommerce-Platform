import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductDetail from "./Pages/ProductDetail";
import SignUp from "./Pages/SignUp";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar.jsx";
import Cart from "./Pages/Cart.jsx"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Login", element: <Login /> },
      { path: "/SignUp", element: <SignUp /> },
      { path: "/ProductDetail/:id", element: <ProductDetail /> },
      { path: "/admin/AddProduct", element: <AddProduct /> },
      { path: "/admin/productsList", element: <ProductList /> },
      { path: "/admin/editProduct/:id", element: <EditProduct /> },
      { path : "/cart", element: <Cart />},
    ],
  },
]);

export default function app() {
  return <RouterProvider router={Router} />;
}
