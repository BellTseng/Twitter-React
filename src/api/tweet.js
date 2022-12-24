import axios from "axios";
import { Toast } from '../utils/utils';

// const baseUrl = 'https://rocky-citadel-44413.herokuapp.com/api';
const baseUrl = 'https://d330-2001-b011-2006-576a-90df-1dc-f7f9-9ce8.jp.ngrok.io/api'

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
  const message = error.response.data.message
  Toast.fire({
    title: `${message}`,
    icon: 'error'
  })
});


// 取得_所有推文
export const getTweets = async () => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets`);
    return data;
  } catch (error) {
    console.error('[Get Tweets failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}

// 取得_一筆推文
export const getTweet = async (tweetId) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}`);
    return data;
  } catch (error) {
    console.error('[Get Tweets failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}

// 新增_推文
export const createTweet = async (payload) => {
  try {
    const { UserId, description } = payload;
    const res = await axiosInstance.post(`${baseUrl}/tweets`, {
      UserId,
      description
    });

    return res.data.postedTweet
  } catch (error) {
    console.error('[Create Tweet failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}


// 取得_所有回覆
export const getReplies = async (tweetId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets/${tweetId}/replies`);
    return res.data;
  } catch (error) {
    console.error('[Get Replies failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}


// 新增_回覆
export const createReply = async (payload) => {
  try {
    const { tweetId, UserId, comment } = payload
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/replies`, {
      UserId,
      comment
    });
    return res.data // reply
  } catch (error) {
    console.error('[Get Replies failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}

// 按讚
export const addLike = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/like`);
    return res.data.data // Like
  } catch (error) {
    console.error('[Add Like failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}

// 移除讚
export const removeLike = async (tweetId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/tweets/${tweetId}/unlike`);
    return res.data.data // unLike
  } catch (error) {
    console.error('[Remove Like failed]:', error);
    const message = error.response.data.message
    Toast.fire({
      title: `${message}`,
      icon: 'error'
    })
  }
}

/* 個人頁面 */

// 取得該使用者的所有推文
export const getUserTweets = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/users/${id}/tweets`)

    return data
  }
  catch (error) {
    console.log('[Get UserTweets failed]:', error)
  }
}

// 取得該使用者的回覆過的推文
export const getUserReplyTweets = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/users/${id}/replied_tweets`)

    return data
  }
  catch (error) {
    console.log('[Get UserReplyTweets failed]:', error)
  }
}

// 取得該使用者的回覆過的推文
export const getUserLikeTweets = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/users/${id}/likes`)

    return data
  }
  catch (error) {
    console.log('[Get UserLikeTweets failed]:', error)
  }
}
