export const SET_BOARDS = "counter/SET_BOARDS";

const initialState = {
  boardStore: [
    { id: 1, type: "board", title: "Past Launches", items: [] },
    { id: 2, type: "board", title: "Launches", items: [] },
    { id: 3, type: "board", title: "My Launches", items: [] },
  ],
};

export default (state = initialState, action) => {
  let actionData = action.data;
  let itemID = 1;
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boardStore: [
          ...state.boardStore.map((board) =>
            board.id === action.boardStore.index
              ? { ...board, items: action.boardStore.content }
              : board
          ),
        ],
      };

    default:
      return state;
  }
};

export const setBoardStore = (boardStore) => {
  return (dispatch) => {
    dispatch({
      type: SET_BOARDS,
      boardStore: boardStore,
    });
  };
};
