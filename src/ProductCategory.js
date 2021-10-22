import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./component/ProductCard";
import Paginators from "./component/Paginators";
import { getProductsByCategory } from "./fetches/productFetch";
import { paginate } from "./utils/paginate";
import "./css/Products.css";
import FourZeroFour from "./Error";
import { useMediaQuery } from "./utils/useMediaQuery";
import { PAGE_SIZE } from "./utils/constants";

function ProductCategory() {
  const [width] = useMediaQuery();
  const componentheightInRem = (width) => {
    return ((width * 0.269) / 16).toString() + "rem";
  };
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const pageSize = PAGE_SIZE;
  useLayoutEffect(() => {
    //ensure page renders at thge top
    window.scrollTo(0, 0);
  });
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      const results = await getProductsByCategory(category);
      if (results.success) {
        //selectedCategory has changed, reset currentpage back to 1
        if (category !== selectedCategory) {
          setSelectedCategory(category);
          setCurrentPage(1);
        }
        setProducts(results.products);
        setPaginatedProducts(paginate(results.products, currentPage, pageSize));
        setNotFound(false);
      } else setNotFound(true);
    };
    fetchData();
  }, [category, currentPage, pageSize, selectedCategory]);

  return (
    <div style={{ minHeight: componentheightInRem(width) }}>
      {notFound && <FourZeroFour />}
      {!notFound && (
        <div className="d-flex justify-content-center text-capitalize mb-1 tall-font">
          Browse {category} cards
        </div>
      )}
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

export default ProductCategory;
