import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const InfoLaunch = (props) => {
  const { title, desc } = props;

  return (
    <>
      <Link to="/">Go to Home page</Link>
      <p>Title: {title}</p>
      <p>Description: {desc}</p>
    </>
  );
};

InfoLaunch.propTypes = {
  title: PropTypes.any,
  desc: PropTypes.any,
};

export default InfoLaunch;
