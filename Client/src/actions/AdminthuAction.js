import axios from 'axios'

export const getdoanhthutrongngay = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/danh-thu-mot-ngay`)
      console.log(data)
      dispatch({type: 'GET_DOANH_THU_TRONG_NGAY', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAllnhanvien = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-het-nhan-vien`)
      console.log(data)
      dispatch({type: 'GET_ALL_NHAN_VIEN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAllnguoidung = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-het-nguoi-dung`)
      console.log(data)
      dispatch({type: 'GET_ALL_NHAN_VIEN', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getAllhoadon = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-het-hoa-don`)
      console.log(data)
      dispatch({type: 'GET_ALL_QUAN_LY_HOA_DON', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }


  export const Xoamemnguoidung = (nhanvien_id) => async (dispatch) => {
    try {
      const {data} = await  axios.put(`http://localhost:4000/admin/xoa-mem-nguoi-dung/${nhanvien_id}`)
      console.log(data)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getnguoidungdetail = (user_id) => async (dispatch) => {
    try {
      const {data} = await axios.get(`http://localhost:4000/admin/lay-nguoi-dung-chi-tiet/${user_id}`)
      console.log(data)
      console.log(user_id)
      dispatch({type: 'GET_NGUOI_DUNG_DETAIL', payload: data})
      // document.location.href = `/sua-thong-tin-nhan-vien/${user_id}`;
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const updatenguoidungdetail = (user_id, user) => async (dispatch) => {
    try {
      const {data} = await axios.put(`http://localhost:4000/admin/sua-thong-tin-nhan-vien/${user_id}`, user)
      console.log(data)
      console.log(user_id)
      document.location.href = `/sua-thong-tin-nhan-vien/${user_id}`;
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getnguoidungxoamem = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-nguoi-dung-xoa-mem`)
      console.log(data)
      dispatch({type: 'GET_NGUOI_DUNG_XOA_MEM', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getnhanvienxoamem = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-nhan-vien-xoa-mem`)
      console.log(data)
      dispatch({type: 'GET_NHAN_VIEN_XOA_MEM', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const khoiphucnguoidung = (user_id) => async (dispatch) => {
    try {
      const {data} = await axios.put(`http://localhost:4000/admin/khoi-phuc-nguoi-dung/${user_id}`)
      console.log(data)
      console.log(user_id)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const xoanguoidung = (user_id) => async (dispatch) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/admin/xoa-nguoi-dung/${user_id}`)
      console.log(data)
      console.log(user_id)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const updatehoso = (medicalrecord_Id, data) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      console.log(data)
      const {datas} = await axios.put(`http://localhost:4000/admin/cap-nhat-ho-so/${medicalrecord_Id}`, data)
      console.log(datas)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const deletememhosobenhan = (medicalrecord_Id) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      const {datas} = await axios.put(`http://localhost:4000/admin/xoa-mem-ho-so-benh-an/${medicalrecord_Id}`)
      console.log(datas)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const khoiphucmemhosobenhan = (medicalrecord_Id) => async (dispatch) => {
    try {
      console.log(medicalrecord_Id)
      const {datas} = await axios.put(`http://localhost:4000/admin/khoi-phuc-ho-so-benh-an/${medicalrecord_Id}`)
      console.log(datas)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const gethoadonxoamem = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-ho-so-xoa-mem`)
      console.log(data)
      dispatch({type: 'GET_HO_SO_XOA_MEM', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const getallhosonoxoamem = () => async (dispatch) => {
    try {
      const {data} = await  axios.get(`http://localhost:4000/admin/lay-ho-so-no-xoa-mem`)
      console.log(data)
      dispatch({type: 'GET_HO_SO_XOA_MEM', payload: data})
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }

  export const xoahosobenhan = (medicalrecord_Id) => async (dispatch) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/xoa-ho-so-benh-an/${medicalrecord_Id}`)
      console.log(data)
      console.log(medicalrecord_Id)
      document.location.href = '';
    } catch (error) {
      dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
    }
  }