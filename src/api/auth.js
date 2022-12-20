import axios from 'axios';
import * as jwt from 'jsonwebtoken';

const authUrl = 'https://rocky-citadel-44413.herokuapp.com/api/users';

export const login = async ({ account, password }) => {
  try {
    const res = await axios.post(`${authUrl}/signin`, {
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

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${authUrl}`, {
    username,
    email,
    password,
  });

  try {
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Register Failed]:', err);
  }
}