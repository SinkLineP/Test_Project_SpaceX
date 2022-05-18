import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "../../modules/counter";
import PropTypes from "prop-types";
import EarthLogo from "./Images/earth-logo.png";
import "./Styles/index.scss";
import DaDTable from "../DaDTable/DaDTable";

const Home = () => {
  return (
    <div>
      <p className={"title"}>
        Explore the space{" "}
        <img src={EarthLogo} alt={"Earth"} className={"logo-earth"} />
      </p>
      <DaDTable />
    </div>
  );
};
// {data.length !== 0 ? data.map((e) => e.name + "; ") : "Loading..."}
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
