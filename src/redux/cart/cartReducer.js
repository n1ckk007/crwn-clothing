import { CartActionTypes } from "./cartTypes";
import { addItomToCart } from "./cartUtils";

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
    default:
      return state;
  }
};

export default cartReducer;
