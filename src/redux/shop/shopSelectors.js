import { createSelector } from "reselect";
import memoize from "lodash.memoize";

export const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // gets us all of the keys of an object that we pass into and gives it to us in an array format
  (collections) => Object.keys(collections).map((key) => collections[key])
  // we want to get all the keys, and then map over that array of keys so we get the value of our collections obj at that key
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    // find collection.id matching the url parameter of our collection id map
    (collections) => collections[collectionUrlParam]
  )
);

// // By wrapping this function is memoize, we're saying that whenever this function gets
// called and receives collectionUrlParam, I want to memoize the return of this function
// (in this case we return a selector). If this function gets called again with the same
// collectionUrlParam, don't rerun this function because we'll return the same value as
// last time, which we've memoized so just return the selector that's been stored.
