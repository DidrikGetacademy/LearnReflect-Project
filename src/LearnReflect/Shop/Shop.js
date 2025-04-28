// Refactored Shop.js with CSS Modules support
import React, { useState } from "react";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import LR from "./images/LRe.png";
import { Link } from "react-router-dom";
import women from "./images/shopwomen.avif";
import men from "./images/working.webp";
import cart2 from "./images/cart2.png";
import search from "./images/search.png";
import Styles from "../Css/shop.module.css";

function ShopPage() {
  const [showInput, setShowInput] = useState(false);
  const [cart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [counts, setCounts] = useState({});


  const addProductToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [product.id]: (prevCounts[product.id] || 1) + 1,
      }));
    } else {
      setCartItems([...cartItems, product]);
      setCounts((prevCounts) => ({
        ...prevCounts,
        [product.id]: 1,
      }));
    }
  };

  const removeCartItem = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[product.id];
      return newCounts;
    });
  };

  return (
   <div className={Styles.ShopContainer}>
      <div className={Styles.LabelContainer}>
        <Link to="/">
          <img alt="" className={Styles["LR-Logo"]} src={LR} />
        </Link>
        <label>
          <Link to="/ShopPage">Home</Link>
        </label>
        <div className={Styles.dropdownShop}>
          <label>Products</label>
          <div className={Styles["dropdownShop-content"]}>
            <a href="Option1">option 1</a>
            <a href="Option2">option 2</a>
            <a href="Option3">option 3</a>
          </div>
        </div>
        <div className={Styles.dropdownShop}>
          <label>Sales</label>
          <div className={Styles["dropdownShop-content"]}>
            <a href="Option1">option 1</a>
            <a href="Option2">option 2</a>
            <a href="Option3">option 3</a>
          </div>
        </div>
        <label>Contact</label>
        <div className={Styles.boxseca}>
          <input
            onClick={() => setShowInput(true)}
            type="text"
            className={Styles.SearchInput}
            placeholder="Search Product"
            style={{ display: showInput ? "block" : "none" }}
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(true)}
            />
          <img
            alt="search"
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(false)}
            src={search}
            />
          <img
            alt="cart"
            className={Styles.cartimg}
            onClick={() => setOpenCart(!cart)}
            src={cart2}
            />
          {cart && (
            <ShoppingCart
            setOpenCart={setOpenCart}
            items={cartItems}
            removeItem={removeCartItem}
            counts={counts}
            updateCounts={setCounts}
            />
          )}
        <div>
        </div>
      </div>
        <img alt="WomenImg" className={Styles.womenImg} src={women} />
        <img alt="MenImg" className={Styles.menImg} src={men} />
      </div>
      <div className={Styles["wall-top"]} />
      <Product addProduct={addProductToCart} />
      <div className={Styles["wall-bottom"]} />
      <div className={Styles["bottom-container"]} />
    </div>
  );
}

export default ShopPage;