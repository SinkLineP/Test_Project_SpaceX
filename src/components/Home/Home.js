import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "../../modules/counter";
import PropTypes from "prop-types";

const Home = (props) => {
  const { data } = props;
  return (
    <div>
      <h1>
        Home:
        {data.length !== 0 ? data.map((e) => e.name + "; ") : "Loading..."}
      </h1>
      <button>Add Product</button>
    </div>
  );
};

const mapStateToProps = ({ counter }) => ({
  data: counter.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDataToStore,
    },
    dispatch
  );

Home.propTypes = {
  addDataToStore: PropTypes.any,
  data: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
