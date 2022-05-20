import React, { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./App.css";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "./modules/counter";
//Routes
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home.js";
import InfoLaunch from "./components/InfoLaunch/InfoLaunch";

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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info-launch">
          <Route path=":itemID" element={<InfoLaunch />} />
        </Route>
      </Routes>
    </>
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
