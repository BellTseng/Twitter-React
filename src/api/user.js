import axios from "axios";
import { Toast } from "../utils/utils";

// const baseUrl = 'https://rocky-citadel-44413.herokuapp.com/api';
const baseUrl = 'https://3ce8-118-150-219-108.jp.ngrok.io/api'

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    config.headers['ngrok-skip-browser-warning'] = 'any'
  }
  return config;
}, (error) => {
  console.error('[]', error)
});

// 取得使用者資料
export const getUser = async (userId) => {
  try {
    console.log('路徑:', `${baseUrl}/users/${userId}`)
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}`);
    console.log('res:', res)
    return res;
  } catch (err) {
    console.error('[Get User failed]:', err);
    return false
  }
}

// 取得個人按讚列表
export const getUserLikes = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/likes`);
    console.log('likes', 'res', res)
    return res.data;
  } catch (err) {
    console.error('[Get Tweets failed]:', err);
  }
}

// 修改個人資料
export const putUser = async (payload) => {
  const { id, name, email, password, checkPassword, account, avatar, cover, introduction } = payload
  try {
    const { data } = await axiosInstance.put(`${baseUrl}/users/${id}`, {
      name,
      email,
      password,
      checkPassword,
      account,
      avatar,
      cover,
      introduction
    })

    return data
  }
  catch (error) {
    console.error('[Put User failed]:', error);

    const errorResponse = error.response.data

    Toast.fire({
      title: `${errorResponse.message}`,
      icon: 'error'
    })

  }
}

// 追隨他人
export const addFollow = (id) => {
  try {
    const { data } = axiosInstance.post(`${baseUrl}/followships`, {
      id
    })

    return data
  }
  catch (error) {
    console.log('[Follow User failed]:', error)
  }
}

// 取消追隨
export const cancelFollow = (id) => {
  try {
    const { data } = axiosInstance.delete(`${baseUrl}/followships/${id}`)

    return data
  }
  catch (error) {
    console.log('[Follow User failed]:', error)
  }
}