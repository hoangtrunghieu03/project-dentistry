export const getDanhthutrongngay  = (state = {}, action) => {
    switch (action.type) {
      case "GET_DOANH_THU_TRONG_NGAY": {
        return { ...state, doanhthungay: action.payload };
      }
      default:
        return state;
    }
  };

  export const getdoanhthutrongthang  = (state = {}, action) => {
    switch (action.type) {
      case "GET_DOANH_THU_TRONG_THANG": {
        return { ...state, doanhthuthang: action.payload };
      }
      default:
        return state;
    }
  };

  export const getdoanhthutrongnam  = (state = {}, action) => {
    switch (action.type) {
      case "GET_DOANH_THU_TRONG_NAM": {
        return { ...state, doanhthunam: action.payload };
      }
      default:
        return state;
    }
  };


  export const getAllnhanvien  = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_NHAN_VIEN": {
        return { ...state, allnhanvien: action.payload };
      }
      default:
        return state;
    }
  };

  export const getAllhoadon  = (state = {}, action) => {
    switch (action.type) {
      case "GET_ALL_QUAN_LY_HOA_DON": {
        return { ...state, quanlyhoadons: action.payload };
      }
      default:
        return state;
    }
  };

  export const getnguoidungdetail  = (state = {}, action) => {
    switch (action.type) {
      case "GET_NGUOI_DUNG_DETAIL": {
        return { ...state, user: action.payload };
      }
      default:
        return state;
    }
  };

  export const getnguoidungxoamem = (state = {}, action) => {
    switch (action.type) {
      case "GET_NGUOI_DUNG_XOA_MEM": {
        return { ...state, nguoidung: action.payload };
      }
      default:
        return state;
    }
  };

  export const getnhanvienxoamem = (state = {}, action) => {
    switch (action.type) {
      case "GET_NHAN_VIEN_XOA_MEM": {
        return { ...state, nhanvien: action.payload };
      }
      default:
        return state;
    }
  };

  export const gethoadonxoamem = (state = {}, action) => {
    switch (action.type) {
      case "GET_HO_SO_XOA_MEM": {
        return { ...state, hosoxoamem: action.payload };
      }
      default:
        return state;
    }
  };