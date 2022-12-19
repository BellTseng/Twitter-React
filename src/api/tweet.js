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


// 取得_所有推文
const getTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`);
    return res.data.data;
  } catch (err) {
    console.error('[Get Tweets failed]:', err);
  }
}

// 取得_一筆推文
const getTweet = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}`);
    return res.data.data;
  } catch (err) {
    console.error('[Get Tweets failed]:', err);
  }
}

// 新增_推文
const createTweet = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });

    return res.data.data;
  } catch (err) {
    console.error('[Greate Todos failed]:', err);
  }
}


/* 個人頁面 */



// 按讚
const addLike = () => {

}

// 移除讚
const removeLike = () => {

}
