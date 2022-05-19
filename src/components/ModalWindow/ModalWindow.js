import React from "react";
import "./Styles/index.scss";
import PropTypes from "prop-types";

const ModalWindow = (props) => {
  const { cbModal, item } = props;
  return (
    <>
      <div className={item === true ? "shadow" : ""}>
        <div className={"modal"}>
          <div className={"body"}>
            <p className={"modal-title"}>Add my launches to all launches.</p>
            <p className={"modal-content"}>Please click. `OK`.</p>
          </div>
          <button onClick={() => cbModal(false)} className={"btn-ok"}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

ModalWindow.propTypes = {
  cbModal: PropTypes.func,
  item: PropTypes.bool,
};

export default ModalWindow;
