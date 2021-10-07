import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./component/ProductCard";
import Paginators from "./component/Paginators";
import { getProductsBy } from "./fetches/productFetch";
import { paginate } from "./utils/paginate";
import "./css/Products.css";
import FourZeroFour from "./Error";
import { useMediaQuery } from "./utils/useMediaQuery";
import { PAGE_SIZE } from "./utils/constants";

function Products() {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(type);
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
        //selectedType has changed, reset currentpage back to 1
        if (type !== selectedType) {
          setSelectedType(type);
          setCurrentPage(1);
        }
        setProducts(results.products);
        setPaginatedProducts(paginate(results.products, currentPage, pageSize));
        setNotFound(false);
      } else setNotFound(true);
    };
    fetchData();
  }, [type, currentPage, pageSize, selectedType]);

  return (
    <div style={{ minHeight: componentheightInRem(width) }}>
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
