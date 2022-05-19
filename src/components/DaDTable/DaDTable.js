import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "../../modules/counter";
import PropTypes from "prop-types";
import "./Styles/index.scss";

const DaDTable = (props) => {
  const { data } = props;
  const [boards, setBoards] = useState([
    { id: 1, type: "board", title: "Past Launches", items: [] },
    { id: 2, type: "board", title: "Launches", items: [] },
    { id: 3, type: "board", title: "My Launches", items: [] },
  ]);
  const countFlights = data.slice(0, 10);
  if (
    boards[0].items.length === 0 &&
    boards[1].items.length === 0 &&
    boards[2].items.length === 0
  ) {
    let id = 1;
    countFlights.map((e) => {
      boards[1].items.push({
        id: id,
        type: "launch",
        extendBoard: 0,
        title: e.name,
        desc: "Falcon " + id,
      });
      id++;
    });
  }

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [drugg, isDraggable] = useState(true);

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
    if (board.id !== 1) {
      setCurrentBoard(board);
      setCurrentItem(item);
    }
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    e.stopPropagation();
    if (board.id !== 1) {
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
  }

  function dropCardHandler(e, board) {
    if (board.id !== 1) {
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
  }

  function draggable(e) {
    const targetExtendBoard = e.target.id;
    if (targetExtendBoard === "1") {
      isDraggable(false);
    } else {
      isDraggable(true);
    }
  }

  return (
    <div className={"app"}>
      {boards.map((board, key) => (
        <div
          id={board.id}
          key={key}
          className={"board"}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
          onMouseOver={(e) => draggable(e)}
        >
          <div id={board.id} className={"board__title"}>
            {board.title}
          </div>
          {board.items.map((item, key) => {
            item.extendBoard = board.id;

            return (
              <div
                id={item.extendBoard}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                key={key}
                className={"item"}
                draggable={drugg}
              >
                <b id={item.extendBoard}>{item.title}</b>
                <p id={item.extendBoard}>{item.desc}</p>
              </div>
            );
          })}
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
