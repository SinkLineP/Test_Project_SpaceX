import React from "react";
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

export default Home;
