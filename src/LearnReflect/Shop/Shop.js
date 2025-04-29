// Refactored Shop.js with CSS Modules support
import React, { useState } from "react";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import LR from "./images/LRe.png";
import { Link } from "react-router-dom";
import cart2 from "./images/cart2.png";
import search from "./images/search.png";
import Styles from "../Css/shop.module.css";

function ShopPage({ handleScrollToPage }) {
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
  <nav className={Styles.navbar}>
    <div className={Styles.logo}>
      <img onClick={() => {handleScrollToPage(null)}} alt="Logo" src={LR} className={Styles["LR-Logo"]} />
      </div>
    <ul className={Styles.navMenu}>
      <li><Link to="/ShopPage">Home</Link></li>
      <li><Link to="/Contact">Contact</Link></li>
      <li className={Styles.dropdown}>
        <span>Products</span>
        <div className={Styles.dropdownContent}>
          <Link to="/Option1">Option 1</Link>
          <Link to="/Option2">Option 2</Link>
          <Link to="/Option3">Option 3</Link>
        </div>
      </li>
      <li className={Styles.dropdown}>
        <span>Sales</span>
        <div className={Styles.dropdownContent}>
          <Link to="/Option1">Option 1</Link>
          <Link to="/Option2">Option 2</Link>
          <Link to="/Option3">Option 3</Link>
        </div>
      </li>
    </ul>
    <div className={Styles.navIcons}>
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
        alt="Search"
        src={search}
        onMouseEnter={() => setShowInput(true)}
        onMouseLeave={() => setShowInput(false)}
        className={Styles.SearchImg}
      />
      <img
        alt="Cart"
        src={cart2}
        className={Styles.cartimg}
        onClick={() => setOpenCart(!cart)}
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
    </div>
  </nav>

  <div className={Styles["wall-top"]} />
  <Product addProduct={addProductToCart} />
  <div className={Styles["wall-bottom"]} />
  <div className={Styles["bottom-container"]} />
</div>

  );
}

export default ShopPage;