import React from "react";
import { connect } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";

// we get match, location and history as props from Route
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    {/* collection to dynamically pluck off right category from our reducer to know which one to display */}
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default connect()(ShopPage);
