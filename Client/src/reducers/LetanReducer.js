export const getAppointmentsLetan = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_APPOINTMENTS_LETAN": {
        return { ...state, appointments: action.payload };
      }
      default:
        return state;
    }
  };

  export const getAppointmentLetan = (state = {}, action) => {
    switch (action.type) {
      case "GET_APPOINTMENT_LETAN": {
        return { ...state, appointment: action.payload };
      }
      default:
        return state;
    }
  };