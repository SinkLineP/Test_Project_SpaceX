import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "./Styles/index.scss";
//redux
import { useSelector } from "react-redux";

const InfoLaunch = () => {
  const paramsURL = useParams();

  function isItems(launch) {
    return Number(launch.itemID) === Number(paramsURL.itemID);
  }

  const oneLaunch = useSelector((state) => state.counter.data?.find(isItems));

  if (!oneLaunch) {
    return <h2>Launch not found!</h2>;
  }

  return (
    <>
      <div className={"card-launch"}>
        <div className={"link-block"}>
          <Link to="/" className={"card-link"}>
            Go to Home page
          </Link>
        </div>
        <p className={"card-title"}>
          Title: <span>{oneLaunch.title}</span>
        </p>
        <p className={"card-desc"}>
          Description: <span>{oneLaunch.desc}</span>
        </p>
      </div>
    </>
  );
};

InfoLaunch.propTypes = {
  data: PropTypes.any,
};

export default InfoLaunch;
