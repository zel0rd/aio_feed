import axiosInstance from "./index";

export const getData = () => axiosInstance.get('/getData')

export const postData = (id: any, value:any) => axiosInstance.get(`/sendData/${id}/${value}`)