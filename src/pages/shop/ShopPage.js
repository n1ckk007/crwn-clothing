import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchCollectionsStartAsync } from "../../redux/shop/shopActions";
import CollectionsOverviewContainer from "../../components/collections-overview/CollectionsOverviewContainer";
import CollectionPageContainer from "../collection/CollectionContainer";

class ShopPage extends Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    // we get match, location and history as props from Route
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        {/* collection to dynamically pluck off right category from our reducer to know which one to display */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
