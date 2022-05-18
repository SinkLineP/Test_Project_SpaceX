import React, { useEffect } from "react";
import Home from "./components/Home/Home.js";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "./modules/counter";
import PropTypes from "prop-types";
import "./App.css";

const App = (props) => {
  const { addDataToStore } = props;
  useEffect(() => {
    async function fetchData() {
      await axios.get("https://api.spacexdata.com/v4/launches").then((res) => {
        addDataToStore(res.data);
      });
    }
    fetchData().then((r) => r);
  }, []);

  return (
    <div>
      <Home />
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

App.propTypes = {
  addDataToStore: PropTypes.any,
  data: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
