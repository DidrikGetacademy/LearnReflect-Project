import React from "react";
import { useLocation } from "react-router-dom";
import Styles from "../Css/shop.module.css";

function ProductCard() {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div>No product selected</div>;
  }

  return (
    <div className={Styles["page-container"]}>
      <div className={Styles["product-container"]}>
        <div className={Styles["Product-cart"]}>
          <h1 className={Styles["title-productcard"]}>{product.title}</h1>
          <img
            className={Styles["productcard-img"]}
            src={product.imageUrl}
            alt={product.title}
          />
          <p className={Styles["pick"]}>Choose Size</p>
          <div className={Styles["sizes"]}>
            <div className={Styles["size"]}>Small</div>
            <div className={Styles["size"]}>Medium</div>
            <div className={Styles["size"]}>XL</div>
            <div className={Styles["size"]}>XXL</div>
          </div>
          <div className={Styles["priceanddescription-productcard"]}>
            <p className={Styles["description-productcard"]}>{product.description}</p>
            <p className={Styles["price-productcard"]}>Price: ${product.Price}</p>
          </div>
          <button>Add Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
