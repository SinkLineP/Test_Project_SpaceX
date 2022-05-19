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
  if (
    boards[0].items.length === 0 &&
    boards[1].items.length === 0 &&
    boards[2].items.length === 0
  ) {
    let id = 1;
    twentyFlights.map((e) => {
      boards[1].items.push({
        id: id,
        title: e.name,
        desc: "Falcon " + id,
      });
      id++;
    });
  }

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    e.stopPropagation();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className={"app"}>
      {boards.map((board, key) => (
        <div
          key={key}
          className={"board"}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className={"board__title"}>{board.title}</div>
          {board.items.map((item, key) => (
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              key={key}
              className={"item"}
              draggable={true}
            >
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
