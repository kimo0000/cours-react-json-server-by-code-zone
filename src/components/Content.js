import './Content.css';
import Sidebar from "./Sidebar";
import Home from "./pages/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import AllProducts from './pages/AllProducts';
import AllCategory from "./pages/AllCategory";
import ViewProduct from "./pages/ViewProduct";
import AddNewProduct from "./pages/AddNewProduct";
import Error from "./pages/Error";
import EditProduct from "./pages/EditProduct";

function Content() {
  return (
    <>
      <div className="content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="allProducts" element={<> <Outlet /> </>}>
            <Route path="" element={<AllProducts />} />
            <Route path=":productID" element={<ViewProduct />} />
            <Route path="addNewProduct" element={<AddNewProduct />} />
          </Route>
          <Route path="allCategory" element={<AllCategory />} />
          <Route path="*" element={<Error />} />
          <Route path="editProduct/:editID" element={<EditProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default Content;
