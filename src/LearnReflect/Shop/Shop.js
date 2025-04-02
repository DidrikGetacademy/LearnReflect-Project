import React, { useState, useEffect } from "react";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";
import LR from "./images/LRe.png";
import { Link } from "react-router-dom";
import women from "./images/shopwomen.avif";
import men from "./images/working.webp";
import cart2 from "./images/cart2.png";
import search from "./images/search.png";
import "../css/LearnReflect.css";

function ShopPage() {
  const [showInput, setShowInput] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    setAnimate(true);
  }, []);
  const addProductToCart = product => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [product.id]: (prevCounts[product.id] || 1) + 1
      }));
    } else {
      setCartItems([...cartItems, product]);
      setCounts(prevCounts => ({
        ...prevCounts,
        [product.id]: 1
      }));
    }
  };

  const removeCartItem = product => {
    setCartItems(cartItems.filter(item => item.id !== product.id));
    setCounts(prevCounts => {
      const newCounts = { ...prevCounts };
      delete newCounts[product.id];
      return newCounts;
    });
  };

  return (
    <div className={`shop-page ${animate ? "animate" : ""}`}>
      <div className="LabelContainer">
        <Link to="/">
          <img alt="" className="LR-Logo " src={LR} />
        </Link>
        <label>
          <Link to="/ShopPage">Home</Link>
        </label>
        <div className="dropdownShop">
          <label>Products</label>
          <div className="dropdownShop-content">
            <a href="Option1">option 1</a>
            <a href="Option2">option 2</a>
            <a href="Option3">option 3</a>
          </div>
        </div>
        <div className="dropdownShop">
          <label>Sales</label>
          <div className="dropdownShop-content">
            <a href="Option1">option 1</a>
            <a href="Option2">option 2</a>
            <a href="Option3">option 3</a>
          </div>
        </div>
        <label>Contact</label>
        <div className="boxseca">
          <input
            onClick={() => setShowInput(true)}
            type="text"
            className="SearchInput"
            placeholder="Search Product"
            style={{ display: showInput ? "block" : "none" }}
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(true)}
          />
          <img
            alt="OnMouseEnter"
            onMouseEnter={() => setShowInput(true)}
            onMouseLeave={() => setShowInput(false)}
            src={search}
          />
          <img
            alt="OnMouseEnter"
            className="cartimg"
            onClick={() => setOpenCart(!cart)}
            src={cart2}
          />
          {cart &&
            <ShoppingCart
              setOpenCart={setOpenCart}
              items={cartItems}
              removeItem={removeCartItem}
              counts={counts}
              updateCounts={setCounts}
            />}
        </div>
      </div>
      <div>
        <img alt="WomenImg" className="womenImg" src={women} />
        <img alt="MenImg" className="menImg" src={men} />
      </div>
      <div className="wall-top" />
      <Product addProduct={addProductToCart} />
      <div className="wall-bottom" />
      <div className="bottom-container" />
    </div>
  );
}

export default ShopPage;
