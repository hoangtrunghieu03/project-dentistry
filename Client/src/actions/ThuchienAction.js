import axios from 'axios'

export const getMedicalrecord = (status) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/thuc-hien/tiep-nhan/${status}`)
      console.log(data)
      dispatch({type: 'GET_ALL_HOSO_TIEPNHAN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getMedicalrecordup = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {data} = await  axios.put(`http://localhost:4000/thuc-hien/tiep-nhan-thuc-hien/${medicalrecord_Id}`)
      console.log(data)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getMedicalrecordback = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {data} = await  axios.put(`http://localhost:4000/thuc-hien/tra-ho-so/${medicalrecord_Id}`)
      console.log(data)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const updateMedicalRecorddetail = (medicalrecord_Id, data) => async (dispatch) => {
    try {
      const {datas} = await  axios.put(`http://localhost:4000/thuc-hien/dang-tuc-hien/${medicalrecord_Id}`, data)
      console.log(datas)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const MedicalRecorddetailup = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {datas} = await  axios.put(`http://localhost:4000/thuc-hien/chuyen-tiep-nhan/${medicalrecord_Id}`)
      console.log(datas)
      document.location.href = '/thong-tin-thuc-hien';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }


  export const getMedicalRecorddetail = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/thuc-hien/tiep-nhan-thuc-hien-detail/${medicalrecord_Id}`)
      console.log(data)
      dispatch({type: 'GET_HOSO_DETAIL', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const seachphone = (phone) => async (dispatch) => {
    try {
      const {data} = await  axios.post('http://localhost:4000/thuc-hien/ho-so-tai-kham', phone)
      console.log(data)
      if ( data.message !== undefined ) {
        window.alert(`${data.message}`);
      } else {
        dispatch({type: 'GET_ALL_HOSO_TIEPNHAN', payload: data})
      }
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }