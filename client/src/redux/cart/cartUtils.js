export const addItomToCart = (cartItems, cartItemToAdd) => {
  // look into existing cart items to see if the new item already exists
  // find will return the first item found in our array based off condition thats passed in
  // get each cart item, check id, if it matches the carts item that we're trying to add id
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  // if it matches it will set that cart item where condition is true to our constant, if not will be undefined
  // if existingCartItem exists then return new array and pass cartitem
  if (existingCartItem) {
    // if cartitems id matches new cart items id just increase the quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : // if id doesn't match just return the og cart item
          cartItem
    );
  }

  // if cart item is not found in our array, return new array with all our existing cart items but also add object with base quantity of 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    // check if the cartitemid = toremove id, if we have existing cart item then check if quantity = 1 then we want to filter it out
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  // if existing items quantity is at 1 then remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // otherwise decrese the quantity and keep everyother cart item the same
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
