import axios from "axios";

const baseUrl = 'https://rocky-citadel-44413.herokuapp.com/api';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
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