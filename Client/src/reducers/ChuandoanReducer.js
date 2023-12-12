export const getAllMedicalRecords = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_HO_SO_CHUAN_DOAN": {
        return { ...state, medicalrecords: action.payload };
      }
      default:
        return state;
    }
  };

  export const getMedicalRecordsDetail = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_HO_SO_CHUAN_DETAIL": {
        return { ...state, medicalrecordetail: action.payload };
      }
      default:
        return state;
    }
  };