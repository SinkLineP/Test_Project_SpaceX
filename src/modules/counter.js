export const ADD_DATA_TO_STORE = "counter/ADD_DATA_TO_STORE";
export const SHOW_MODAL = "counter/SHOW_MODAL";

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_TO_STORE:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export const addDataToStore = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATA_TO_STORE,
      data: data,
    });
  };
};
