import axios from 'axios';
import * as jwt from 'jsonwebtoken';

const authUrl = 'https://rocky-citadel-44413.herokuapp.com/api/users';

export const login = async ({ account, password }) => {
  try {
    const { res } = await axios.post(`${authUrl}/signin`, {
      account,
      password
    });

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

export const checkPermission = async (authToken) => {

  const tempPayload = jwt.decode(authToken);
  // if (tempPayload) {
  //   setPayload(tempPayload);
  //   setIsAuthenticated(true);
  //   localStorage.setItem('authToken', authToken);
  // } else {
  //   setPayload(null);
  //   setIsAuthenticated(false);
  // }

  try {
    const response = await axios.get(`${authUrl}`, {
      headers: {
        Authorization: 'Bearer' + authToken
      }
    });

    return response.data.success;
  } catch (err) {
    console.error('[Test Token Failed]:', err);
  }

}