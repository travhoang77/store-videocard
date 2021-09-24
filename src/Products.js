import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./component/ProductCard";
import Paginators from "./component/Paginators";
import { getProductsBy } from "./fetches/productFetch";
import { paginate } from "./utils/paginate";
import "./css/Products.css";
import FourZeroFour from "./FourZeroFour";
import { PAGE_SIZE } from "./utils/constants";

function Products() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const pageSize = PAGE_SIZE;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      const results = await getProductsBy(type);
      if (results.success) {
        setProducts(results.products);
        setPaginatedProducts(paginate(results.products, currentPage, pageSize));
        setNotFound(false);
      } else setNotFound(true);
    };
    fetchData();
  }, [type, currentPage, pageSize]);

  return (
    <div style={{ minHeight: "35rem" }}>
      {notFound && <FourZeroFour />}
      <div className="d-flex justify-content-center mb-2">
        <Paginators
          itemsCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="product">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} id={product._id} product={product} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Paginators
          itemsCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Products;
