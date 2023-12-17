
export const UserSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return { ...state, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const UserSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export const UserSignoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNOUT_SUCCESS":
      return { ...state };
    default:
      return state;
  }
};

export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_USER": {
      return { ...state, user: action.payload };
    }
    case "DELETE_USER": {
      return { ...state };
    }

    default:
      return state;
  }
};

export const getAppointmentsUser = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_APPOINTMENT_USER": {
      return { ...state, appointment: action.payload };
    }
    default:
      return state;
  }
};

export const getHistoryappointment = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_HISTORY_APPOINTMENT_USER": {
      return { ...state, historyappoint: action.payload };
    }
    default:
      return state;
  }
};

export const getAllhosoNguoidung = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_HOSO": {
      return { ...state, hosonguoidung: action.payload };
    }
    default:
      return state;
  }
};


