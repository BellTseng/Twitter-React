import axios from 'axios';
import { Toast } from '../utils/utils';

// const authUrl = 'https://rocky-citadel-44413.herokuapp.com/api/users';
// const authUrl = 'https://1e3b-2001-b011-2006-3845-d52-7bb7-c036-170d.jp.ngrok.io/api/users';
const authUrl = 'https://f8f2-118-150-219-108.jp.ngrok.io/api/users';

const axiosInstance = axios.create({
  headers: { 'ngrok-skip-browser-warning': 'any' }
});


export const login = async ({ account, password }) => {
  try {
    const res = await axiosInstance.post(`${authUrl}/signin`, {
      account,
      password
    });
    console.log('res', res) // 還是這裡被反覆執行？
    const token = res.data.token;
    if (token) {
      return { ...res.data };
    }
    return res.data;
  } catch (err) {
    console.error('[Login Failed]:', err);
  }
}

export const register = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data } = await axiosInstance.post(`${authUrl}/api/users`, {
      account,
      name,
      email,
      password,
      checkPassword
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
    const { data } = await axios.post(`${authUrl}/api/admin/signin`, {
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
        Authorization: `Bearer ${authToken}`
      }
    })

    return data
  }
  catch (error) {
    console.error('[Failed]: ', error.message)
  }
}