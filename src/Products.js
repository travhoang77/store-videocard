import React, { useEffect, useState } from "react";
import { BrowserRouter as Route, useParams } from "react-router-dom";
import ProductCard from "./component/ProductCard";
import { getProductsBy } from "./fetches/productFetch";
import "./css/Products.css";

function Products() {
  const { type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await getProductsBy(type);
      if (results.success) setProducts(results.products);
    };
    fetchData();
  }, []);

  const empty = products.length === 0 ? "error" : "d-none";
  return (
    <div className="product">
      <span className={empty}>NO PRODUCTS</span>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default Products;
