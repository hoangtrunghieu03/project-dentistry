import axios from 'axios'

export const Receiveback = (appoin_id) => async (dispatch) => {
    try {
      console.log(appoin_id)
      const {data} = await axios.put(`http://localhost:4000/chuan-doan/tiep-nhan-back/${appoin_id}`)
      console.log(data)
      document.location.href = '';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 

  export const Receiveup = (appoin_id) => async (dispatch) => {
    try {
      console.log(appoin_id)
      const {data} = await axios.post(`http://localhost:4000/chuan-doan/tiep-nhan-up/${appoin_id}`)
      console.log(data)
      document.location.href = '';
  
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 

  export const getAllMedicalRecords = (status) => async (dispatch) => {
    try {
      console.log(status)
      const {data} = await axios.get(`http://localhost:4000/chuan-doan/ho-so/${status}`)
      console.log(data)
      dispatch({type: 'GET_ALL_HO_SO_CHUAN_DOAN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 

  export const getMedicalRecorddetail = (medicalrecord_Id) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      const {data} = await axios.get(`http://localhost:4000/chuan-doan/ho-so-detail/${medicalrecord_Id}`)
      console.log(data)
      dispatch({type: 'GET_ALL_HO_SO_CHUAN_DETAIL', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 

  export const updateMedicalRecorddetail = (medicalrecord_Id, data) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      const {datas} = await axios.put(`http://localhost:4000/chuan-doan/cap-nhat-ho-so-chuan-doan/${medicalrecord_Id}`, data)
      console.log(datas)
      dispatch({type: 'GET_ALL_HO_SO_CHUAN_DETAIL', payload: data})
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 

  export const MedicalRecorddetailup = (medicalrecord_Id) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      const {data} = await axios.put(`http://localhost:4000/chuan-doan/chuyen-ho-so/${medicalrecord_Id}`)
      console.log(data)
      document.location.href = '/chuan-doan';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  } 
