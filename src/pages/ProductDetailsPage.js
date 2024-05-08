// import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/navbar";
import { ProductDetails } from "../features/product-List/components/ProductDetails";

function ProductDetailsPage() {
  return (
    <div>
      <Navbar />
      <ProductDetails />

      {/* <Outlet></Outlet> */}
    </div>
  );
}

export default ProductDetailsPage;
