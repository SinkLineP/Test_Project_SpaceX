import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addProduct, clearProduct, removeProduct} from "../../modules/counter";

const Home = (props) => {
  const {count, addProduct, removeProduct, clearProduct} = props;

  return (
    <div>
      <h1>Home</h1>
      <p>Product counts: {count};</p>
      <button onClick={addProduct}>Add Product</button>
      <button onClick={removeProduct}>Remove Product</button>
      <button onClick={clearProduct}>Clear Products</button>
    </div>
  )
}

const mapStateToProps = ({ counter }) => ({
  count: counter.count
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addProduct,
  removeProduct,
  clearProduct
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)