// import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/navbar";
import ProductList from "../features/product-List/components/productList";

function Home() {
  return (
    <div>
      <Navbar />
      <ProductList />

      {/* <Outlet></Outlet> */}
    </div>
  );
}

export default Home;
