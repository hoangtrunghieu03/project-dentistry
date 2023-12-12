export const getAllmedicalrecordTiepnhan = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_HOSO_TIEPNHAN": {
        return { ...state, medicalrecordtiepnhans: action.payload };
      }
      default:
        return state;
    }
  };

  export const getAllmedicalrecordthuchien = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_HOSO_THUCHIEN": {
        return { ...state, medicalrecordthuchiens: action.payload };
      }
      default:
        return state;
    }
  };

  export const getAllmedicalrecordDetail = (state = {}, action) => {
    switch (action.type) {
      case "GET_HOSO_DETAIL": {
        return { ...state, medicalrecordetail: action.payload };
      }
      default:
        return state;
    }
  };

