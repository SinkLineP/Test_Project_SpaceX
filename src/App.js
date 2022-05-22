import React, { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./App.css";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setBoardStore } from "./modules/counter";
//Routes
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import InfoLaunch from "./components/InfoLaunch/InfoLaunch";

const App = (props) => {
  const { setBoardStore } = props;
  useEffect(() => {
    async function fetchData() {
      let itemID = 1;
      await axios.get("https://api.spacexdata.com/v4/launches").then((res) => {
        let newArray = res.data;

        newArray.map((item) => {
          item.itemID = itemID;
          item.desc = "Falcon-" + itemID;
          item.title = item.name;
          item.extendBoard = 0;
          itemID++;
        });

        setBoardStore({
          index: 2,
          content: newArray.slice(0, 10),
        });
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
  allLaunches: counter.allLaunches,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBoardStore,
    },
    dispatch
  );

App.propTypes = {
  setBoardStore: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
