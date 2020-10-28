import React from "react";
import "./CartDropdown.scss";
import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cartSelectors";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cartActions";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        //if theres a value greater than 0 then render cart items
        cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          // if no items render msg
          <span className="empty-message">Your cart is empty</span>
        )
      }
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

// if we dont supply mdtp as 2nd param to connect, connect will pass the dispatch into our component as a prop
export default withRouter(connect(mapStateToProps)(CartDropdown));
