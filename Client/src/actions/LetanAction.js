import axios from 'axios'

export const themnguoikham = (lichhen) => async (dispatch) => {
    try {
      const {data} = await  axios.post(`http://localhost:4000/le-tan/them-tiep-nhan`, lichhen)
      if(data) {
        document.location.href = '/tiep-nhan-le-tan';
        alert('Tiếp nhận thành công');
        console.log(data)
      }
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAppointments = (status) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/le-tan/tiep-nhan/${status}`)
      dispatch({type: 'GET_ALL_APPOINTMENTS_LETAN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const Deleteappoin = (appoin_id) => async (dispatch) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/le-tan/xoa-tiep-nhan/${appoin_id}`)
      console.log(data)
      document.location.href = '/tiep-nhan-le-tan';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const Deletelichhen = (appoin_id) => async (dispatch) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/le-tan/xoa-tiep-nhan/${appoin_id}`)
      console.log(data)
      document.location.href = '/le-tan-lich-hen';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const receive = (appoin_id) => async (dispatch) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/le-tan/xoa-tiep-nhan/${appoin_id}`)
      console.log(data)
      document.location.href = '/tiep-nhan-le-tan';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  
  export const Updatereceive = (appoin_id) => async (dispatch) => {
    try {
      console.log(appoin_id)
      const {data} = await axios.put(`http://localhost:4000/le-tan/chuyen-phong/${appoin_id}`)
      console.log(data)
      document.location.href = '';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const Updatelichhen = (appoin_id) => async (dispatch) => {
    try {
      const {data} = await axios.put(`http://localhost:4000/le-tan/cap-nhat-lich-hen/${appoin_id}`)
      console.log(data)
      document.location.href = '/le-tan-lich-hen';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAppointment = (appoin_id) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/le-tan/tiep-nhan-chi-tiet/${appoin_id}`)
      dispatch({type: 'GET_APPOINTMENT_LETAN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const Updatetiepnhan = (appoin_id, tiepnhan) => async (dispatch) => {
    try {
      const {data} = await axios.put(`http://localhost:4000/le-tan/cap-nhat-tiep-nhan/${appoin_id}`, tiepnhan)

      console.log(data)
      alert('Cập nhật thành công.');
      document.location.href = '/tiep-nhan-le-tan';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }
