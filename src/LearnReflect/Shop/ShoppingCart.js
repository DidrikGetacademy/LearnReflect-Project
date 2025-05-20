import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../Css/shop.module.css";
function ShoppingCart({
  items = [],
  removeItem,
  counts,
  updateCounts,
  setOpenCart
}) {
  const [hidden] = useState(false);
  const [totalAmount, setTotal] = useState(0);
  const Navigate = useNavigate();

  const GotoPayment = () => {
    // Navigate('/Payment', { state: { totalAmount }});
  }

 
  useEffect(() => {
    const totalPrice = items.reduce((acc, item) => {
      const itemcount = counts[item.id] || 0;
      return acc + item.Price * itemcount;
    }, 0);
    setTotal(totalPrice);
    
  }, [items, counts]);



  const handleincrement = (item) => {
    updateCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: (prevCounts[item.id] || 1) + 1
    }));
  };



  const handledecrement = (item) => {
    updateCounts((prevCounts) => ({
      ...prevCounts,
      [item.id]: ((prevCounts[item.id] || 1) - 1)
    }));
  };

  const TotalItems = items.reduce((acc,item) => acc + (counts[item.id]  ||0),0);
  
  return (
    <div className={Styles["Cart-Container"]}>
      <div className={Styles["shopping-cart"]}>
        {TotalItems > 0 && (
          <div style={{ display: hidden ? 'none' : 'block' }} className={Styles["item"]}>
            {items.map((item, index) => (
              <div key={index} className={Styles["item"]}>
                <div className={Styles["image"]}>
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <span>{item.title}</span>
                <div className={Styles["description"]}>
                  <span>{item.description}</span>
                </div>
                <button onClick={() => handleincrement(item)}>+</button>
                <span className={Styles.itemCount}>{counts[item.id] || 0}</span>
                <button onClick={() => handledecrement(item)}>-</button>
                <button onClick={() => removeItem(item)}>Remove</button>
                <div>{item.Price}$</div>
              </div>
            ))}
          </div>
        )}
        <div className={Styles["CartCloseCheckout"]}>
          <div className={Styles["total-price"]}>Total {totalAmount} $</div>
          <button onClick={GotoPayment} className={Styles["Checkout"]}>Checkout</button>
          <button onClick={() => setOpenCart(false)} className={Styles["Close"]}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
