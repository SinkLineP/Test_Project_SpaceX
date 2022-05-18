import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "../../modules/counter";
import PropTypes from "prop-types";
import "./Styles/index.scss";

const DaDTable = (props) => {
  const { data } = props;
  const [boards, setBoards] = useState([
    { id: 1, title: "Past Launches", items: [] },
    { id: 2, title: "Launches", items: [] },
    { id: 3, title: "My Launches", items: [] },
  ]);
  const twentyFlights = data.slice(0, 10);
  if (boards[0].items.length === 0) {
    let id = 1;
    twentyFlights.map((e) => {
      boards[0].items.push({
        id: id,
        title: e.name,
        desc: "Falcon " + id,
      });
      id++;
    });
  }

  return (
    <div className={"app"}>
      {boards.map((board, key) => (
        <div key={key} className={"board"}>
          <div className={"board__title"}>{board.title}</div>
          {board.items.map((item, key) => (
            <div key={key} className={"item"}>
              <b>{item.title}</b>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      ))}
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

DaDTable.propTypes = {
  addDataToStore: PropTypes.any,
  data: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(DaDTable);
