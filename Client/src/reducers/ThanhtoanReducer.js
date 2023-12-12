export const getmedicalrecordDetail  = (state = {}, action) => {
    switch (action.type) {
      case "GET_DETAIL_HOA_DON": {
        return { ...state, hoadondetail: action.payload };
      }
      default:
        return state;
    }
  };

  export const getAllhosono  = (state = {}, action) => {
    switch (action.type) {
      case "GET_DETAIL_HOA_DON": {
        return { ...state, hosono: action.payload };
      }
      default:
        return state;
    }
  };