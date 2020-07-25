import { createSelector } from "reselect";

// input selector, func that gets the whole state and just returns a slice of it (1 layer deep)
const selectCart = (state) => state.cart;

// createSelector takes 2 args, first being a collection (array) of input selectors. 2nd arg func that'll return the value we want out of this selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);
