export const ADD_PRODUCT = 'counter/ADD_PRODUCT'
export const REMOVE_PRODUCT = 'counter/REMOVE_PRODUCT'
export const CLEAR_PRODUCT = 'counter/CLEAR_PRODUCT'

const initialState = {
  count: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        count: state.count + 1,
      }
    case REMOVE_PRODUCT:
      if (state.count >= 1) {
        return {
          ...state,
          count: state.count - 1,
        }
      } else {
        return {
          ...state,
          count: 0,
        }
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        count: 0,
      }
      break;

    default:
      return state

  }
}

export const addProduct = () => {
  return dispatch => {
    dispatch({
      type: ADD_PRODUCT
    })
  }
}

export const removeProduct = () => {
  return dispatch => {
    dispatch({
      type: REMOVE_PRODUCT
    })
  }
}

export const clearProduct = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PRODUCT
    })
  }
}
