const { createStructuredSelector } = require("reselect");
const { selectIsCollectionsLoaded } = require("../../redux/shop/shopSelectors");
const { compose } = require("redux");
const { connect } = require("react-redux");
const {
  default: WithSpinner,
} = require("../../components/with-spinner/WithSpinner");
const { default: CollectionPage } = require("./CollectionPage");

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
