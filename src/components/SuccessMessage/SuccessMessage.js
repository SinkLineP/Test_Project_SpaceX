import React from "react";
import "./Styles/index.scss";
import PropTypes from "prop-types";

const SuccessMessage = (props) => {
  const { title, content } = props;

  return (
    <>
      <div className={"message"}>
        <h1 className={"label"}>{title}</h1>
        <p className={"content"}>{content}</p>
      </div>
    </>
  );
};

SuccessMessage.propTypes = {
  title: PropTypes.any,
  content: PropTypes.any,
};

export default SuccessMessage;
