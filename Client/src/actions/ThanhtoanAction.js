import axios from 'axios'

export const getMedicalRecorddetail = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/thanh-toan/hoa-don-chi-tiet/${medicalrecord_Id}`)
      console.log(data)
      dispatch({type: 'GET_DETAIL_HOA_DON', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const updateMedicalRecorddetail = (medicalrecord_Id, data, status) => async (dispatch) => {
    try {
      const {datas} = await  axios.put(`http://localhost:4000/thanh-toan/hoa-don/${medicalrecord_Id}`, data)
      console.log(datas)
      if (status === 'hoan-tat') {
        document.location.href = '/ho-so-no';
      } else {
        document.location.href = '/ho-so-thanh-toan';
      }
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAllhosono = (status) => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/thanh-toan/hoa-don-no/${status}`)
      console.log(data)
      dispatch({type: 'GET_DETAIL_HOA_DON', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }