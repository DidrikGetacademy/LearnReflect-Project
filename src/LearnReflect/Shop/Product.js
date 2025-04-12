import React, { useState, useEffect } from "react";
import dummyProducts from "./dummyProducts";
import { useNavigate } from "react-router-dom";
import Styles from "../Css/shop.module.css";
function Product({ addProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const HandleProductClick = (product) => {
    Navigate(`/ProductCard`, { state: { product } });
  };

  useEffect(() => {
    setTimeout(() => {
      try {
        setProducts(dummyProducts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={Styles["product-page"]}>
      {products.map((product) => (
        <div key={product.id} className={Styles["product"]}>
          <h1>{product.title}</h1>
          <img
            onClick={() => HandleProductClick(product)}
            className={Styles["ProductImg"]}
            src={product.imageUrl}
            alt={product.title}
          />
          <p>{product.description}</p>
          <button
            className={Styles["AddToCartButton"]}
            onClick={() => addProduct(product)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;