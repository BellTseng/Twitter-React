import axios from 'axios';

const authUrl = 'https://rocky-citadel-44413.herokuapp.com/api/users';

export const login = async ({ account, password }) => {

  try {
    const { data } = await axios.post(`${authUrl}/signin`, {
      account,
      password
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    console.log(data);

    return data;
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
  try {
    const response = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer' + authToken
      }
    });

    return response.data.success;
  } catch (err) {
    console.error('[Test Token Failed]:', err);
  }

}