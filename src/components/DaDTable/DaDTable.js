import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Styles/index.scss";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Link } from "react-router-dom";
import { setBoardStore } from "../../modules/counter";

const DaDTable = (props) => {
  const { setBoardStore, boardStore } = props;

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [drugg, isDraggable] = useState(true);
  const [message, isMessage] = useState(false);
  const [modal, isModal] = useState(false);

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
      setBoardStore(
        boardStore.map((b) => {
          if (b.id === board.id) {
            if (b.id === 3) {
              AlertSuccess();
            }
            if (b.id === 2) {
              showModal();
            }
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
    if (board.id === 3) {
      boardStore[0].items.push(currentItem);
    }
  }

  function AlertSuccess() {
    isMessage(true);
    setTimeout(() => {
      isMessage(false);
    }, 3000);
  }

  function dropCardHandler(e, board) {
    if (board.id !== 1) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      setBoardStore(
        boardStore.map((b) => {
          if (b.id === board.id) {
            if (b.id === 3) {
              AlertSuccess();
            }
            if (b.id === 2) {
              showModal();
            }
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
    if (board.id === 3) {
      boardStore[0].items.push(currentItem);
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

  function showModal() {
    isModal(true);
  }

  function callbackModal(props) {
    isModal(props);
  }

  return (
    <>
      <div className={"show-modal-" + modal}>
        <ModalWindow cbModal={(e) => callbackModal(e)} item={modal} />
      </div>
      <div className={"show-message-" + message}>
        <SuccessMessage
          title={"Success!"}
          content={"Launch added to My Launch"}
        />
      </div>
      <div className={"app"}>
        {boardStore.map((board, key) => (
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
                  <div className={"link-block-info"}>
                    <Link
                      to={`/info-launch/${item.itemID}`}
                      className={"info-link"}
                    >
                      more...
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = ({ counter }) => ({
  boardStore: counter.boardStore,
  data: counter.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setBoardStore,
    },
    dispatch
  );

DaDTable.propTypes = {
  setBoardStore: PropTypes.any,
  boardStore: PropTypes.any,
  data: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(DaDTable);
