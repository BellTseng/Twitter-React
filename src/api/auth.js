import axios from 'axios';
import { Toast } from '../utils/utils';

const authUrl = 'https://rocky-citadel-44413.herokuapp.com'
// const authUrl = 'https://4772-118-150-219-108.jp.ngrok.io'

const axiosInstance = axios.create({
  headers: { 'ngrok-skip-browser-warning': 'any' }
});

// axiosInstance.interceptors.request.use((config) => {
//   config.headers['ngrok-skip-browser-warning'] = 'any'

//   return config;
// }, (error) => {
//   console.error('[]', error)
// });

export const login = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(`${authUrl}/api/users/signin`, {
      account,
      password,
    });
    const token = data.token;
    if (token) {
      return { ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
    const message = error.response.data.message
    console.log('message', message)
    if (message.includes('帳號不存在')) {
      Toast.fire({
        title: '帳號不存在！',
        icon: 'error'
      })
    }
    if (message.includes('帳號或密碼')) {
      Toast.fire({
        title: '帳號或密碼錯誤錯誤！',
        icon: 'error'
      })
    }
  }
}

export const register = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data } = await axiosInstance.post(`${authUrl}/api/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    console.log(data)
    if (data.status === 'success') {
      return { ...data }
    }

    return data
  }
  catch (error) {
    console.error('[Register Failed]: ', error);
    const message = error.response.data.message

    if (message.account && message.email) {
      Toast.fire({
        title: '帳號和信箱重複註冊',
        icon: 'error'
      })
    }
    else if (message.account) {
      Toast.fire({
        title: `${message.account}`,
        icon: 'error'
      })
    }
    else if (message.email) {
      Toast.fire({
        title: `${message.email}`,
        icon: 'error'
      })
    }
  }
}

export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(`${authUrl}/api/admin/signin`, {
      account,
      password,
    });

    if (data.status === 'success') {
      return { ...data }
    }

    return data
  }
  catch (error) {
    console.error('[Register Failed]: ', error.message);
  }
}

export const adminCheckPermission = async (authToken) => {
  try {
    const { data } = await axios.get(`${authUrl}/api/admin/user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'ngrok-skip-browser-warning': 'any'
      }
    })

    return data
  }
  catch (error) {
    console.error('[Failed]: ', error.message)
  }
}