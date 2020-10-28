import React from "react";
import "./CartItem.scss";

// we want cart item to only update when it has to, which should only occur when the item that gets passed in changes
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="name">
        {" "}
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

// to memoize
export default React.memo(CartItem);
