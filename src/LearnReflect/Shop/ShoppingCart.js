import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    Navigate('/Payment', { state: { totalAmount }});
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
    <div className="Cart-Container">
      <div className="shopping-cart">
      {TotalItems > 0 && (

        <div  style={{ display: hidden ? 'none' : 'block'}} className="item">
          {items.map((item, index) => (
            <div key={index} className="item">
              <div className="image">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <span>{item.title}</span>
              <div className="description">
                <span>{item.description}</span>
              </div>
              <button onClick={() => handleincrement(item)}>+</button>
              <span>{counts[item.id] || 0}</span>
              <button onClick={() => handledecrement(item)}>-</button>
              <button onClick={() => removeItem(item)}>Remove</button>
              <div>{item.Price}$</div>
            </div>
          ))}
        </div>
      )}
        <div className="CartCloseCheckout">
          <div className="total-price">Total {totalAmount} $</div>
          <button  onClick={GotoPayment} className="Checkout">Checkout</button>
          <button onClick={() => setOpenCart(false)} className="Close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
