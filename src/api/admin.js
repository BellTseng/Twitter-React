import axios from "axios";

// const baseUrl = 'https://rocky-citadel-44413.herokuapp.com'
const baseUrl = 'https://3c71-118-150-219-108.jp.ngrok.io'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6InJvb3QiLCJlbWFpbCI6InJvb3RAZXhhbXBsZS5jb20iLCJhY2NvdW50Ijoicm9vdCIsImF2YXRhciI6Imh0dHBzOi8vbG9yZW1mbGlja3IuY29tLzMyMC8yNDAvYm95LGdpcmwvP3JhbmRvbT05OCIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vMTUwMC84MDAvbW91bnRhaW4iLCJpbnRyb2R1Y3Rpb24iOm51bGwsInJvbGUiOiJhZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjItMTItMTlUMTY6NTg6MDIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMTlUMTY6NTg6MDIuMDAwWiIsImlhdCI6MTY3MTUzMTYwNiwiZXhwIjoxNjc0MTIzNjA2fQ.gh10qIVTAuj-MItd1gY2daS8nJOZjqyLeNlzO_Kl_90'

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