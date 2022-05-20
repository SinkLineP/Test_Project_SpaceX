export const ADD_DATA_TO_STORE = "counter/ADD_DATA_TO_STORE";

const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  let actionData = action.data;
  let itemID = 1;
  switch (action.type) {
    case ADD_DATA_TO_STORE:
      actionData.map((item) => {
        //make option
        item.make = "itemID";
        item.make = "desc";
        item.make = "title";
        item.make = "extendBoard";
        //set option
        item.itemID = itemID;
        item.desc = "Falcon" + itemID;
        item.title = item.name;
        item.extendBoard = 0;
        itemID++;
      });
      return {
        ...state,
        data: actionData,
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
