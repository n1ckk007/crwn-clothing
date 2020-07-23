import React from "react";
import "./Collection-item.scss";
import CustomButton from "../custom-button/CustomButton";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartActions";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  //create new function thats a prop called addItem, which receives the item as the prop, pass it into our addItem action creator
  // which gives us back that obj where type = addItem and payload = item that got passed in then dispatch new object into our store
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
