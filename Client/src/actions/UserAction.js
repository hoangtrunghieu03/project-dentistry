import axios from 'axios'
import { useSelector } from 'react-redux';

  export const login = (user) => async (dispatch) => {
      try {
        const {data} = await axios.post('http://localhost:4000/user/login', user)
        console.log(data)
        dispatch({ type: 'np ', payload: data });  
        localStorage.setItem('userInfo', JSON.stringify(data));
        if (data) {
          if (data.status === 'admin') {
            document.location.href = "/doanh-thu-trong-trong-ngay";
          } else if (data.status === 'nguoi-dung') {
            document.location.href = "/thong-tin-nguoi-dung";
          } else if (data.status === 'le-tan') {
            document.location.href ="/tiep-nhan-le-tan";
          } else if (data.status === 'chuan-doan') {
            document.location.href = "/tiep-nhan-chuan-doan";
          } else if (data.status === 'thuc-hien') {
            document.location.href = "/tiep-nhan-thuc-hien";
          } else if (data.status === 'thu-ngan') {
            document.location.href = "/ho-so-thanh-toan";
          } else {
            document.location.href = "/";
          }
        }
      } catch (error) {
        console.log(error.response.data.message)
        dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message });
      }
  };

  export const sua = (user_id, user, userInfo) => async (dispatch) => {
    try {
      let link = '';
  
      if (userInfo.status === 'nguoi-dung') {
        link = '/thong-tin-nguoi-dung';
      } else if (userInfo.status === 'le-tan') {
        link = '/thong-tin-le-tan';
      } else if (userInfo.status === 'chuan-doan') {
        link = '/thong-tin-chuan-doan';
      }
      const response = await axios.put(`http://localhost:4000/user/sua-nguoi-dung/${user_id}`, user);
      const { user: userData, message } = response.data;
      console.log(userData);
      console.log(message);
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: { userData, message } });
      localStorage.setItem('userInfo', JSON.stringify(userData));
      document.location.href = link;
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'UPDATE_USER_FAIL', payload: error.response.data.message });
    }
  };

  export const datlich = (user_id, user) => async (dispatch) => {
    try {
      const  {data} = await axios.post(`http://localhost:4000/user/dat-lich/${user_id}`, user);
      console.log(data);
      document.location.href = '/lich-hen-nguoi-dung';
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: 'UPDATE_USER_FAIL', payload: error.response.data.message });
    }
  };
  
  export const SignupUser = (user) => async (dispatch) => {
      try {
        const {data} = await axios.post('http://localhost:4000/user/register', user)
        console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
        // document.location.href = '/';
      } catch (error) {
        console.log(error)
      }
  };

  export const SignoutUser = (user) => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'USER_SIGNOUT_SUCCESS', payload: {} });
    window.location.href = '/login';  // Corrected line
  };
  

export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await  axios.get('http://localhost:4000/user')
    console.log(data)
    dispatch({type: 'GET_ALL_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete(`http://localhost:4000/user/delete/${userId}`)
    dispatch({type: 'DELETE_USER', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}

export const getAppointments = (user_Id) => async (dispatch) => {
  try {
    const {data} = await  axios.get(`http://localhost:4000/user/lich-hen/${user_Id}`)
    dispatch({type: 'GET_ALL_APPOINTMENT_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const getHistoryappointment = (user_Id) => async (dispatch) => {
  try {
    const {data} = await  axios.get(`http://localhost:4000/user/lich-su/${user_Id}`)
    console.log(data)
    dispatch({type: 'GET_ALL_HISTORY_APPOINTMENT_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const Deleteappoin = (user_Id, appoin_id) => async (dispatch) => {
  try {
    const {data} = await axios.delete(`http://localhost:4000/user/xoa-lich-hen/${appoin_id}`)
    console.log(data)
    document.location.href = '/lich-hen-nguoi-dung';

  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const getAllhoso = (userId) => async (dispatch) => {
  try {
    const {data} = await  axios.get(`http://localhost:4000/user/hoa-don/${userId}`)
    console.log(data)
    dispatch({type: 'GET_ALL_HOSO', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

