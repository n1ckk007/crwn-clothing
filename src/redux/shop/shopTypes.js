const ShopActionTypes = {
  // tells redux we're starting to fetch the data
  FETCH_COLLECTIONS_START: "FETCH_COLLECTIONS_START",
  // comes back to us w a successful api request and the data we need
  FETCH_COLLECTIONS_SUCCESS: "FETCH_COLLECTIONS_SUCCESS",
  FETCH_COLLECTIONS_FAILURE: "FETCH_COLLECTIONS_FAILURE",
};

export default ShopActionTypes;
