import { CartActionTypes } from "./cartTypes";
import { addItomToCart, removeItemFromCart } from "./cartUtils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        // whatever the boolean value is, convert it to the opposite of it
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        //spreading in all of our array values then any additional values we add at the end will apear at the end of the array
        cartItems: addItomToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        // update cartItems so will return new array without any instance of the item that we're trying to clear away
        cartItems: state.cartItems.filter(
          // filter returns back anything that yields true
          // if cartItem id doesn't match action payload (the item we're trying to remove) id then keep it, if matches then filter it out
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
