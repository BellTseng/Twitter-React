import axios from "axios";

const baseUrl = 'https://rocky-citadel-44413.herokuapp.com'
// const baseUrl = 'https://d330-2001-b011-2006-576a-90df-1dc-f7f9-9ce8.jp.ngrok.io'


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


export const adminGetTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/admin/tweets`);

    return res.data
  }
  catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};

export const adminDeleteTweet = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/api/admin/tweets/${id}`);

    return res.data
  }
  catch (error) {
    console.error('[Delete Tweet failed]: ', error);
  }
}

export const adminGetUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/admin/users`);

    return res.data
  }
  catch (error) {
    console.error('[Delete Tweet failed]: ', error);
  }
}