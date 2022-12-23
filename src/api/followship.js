import axios from "axios";

// const baseUrl = 'https://rocky-citadel-44413.herokuapp.com/api';
const baseUrl = 'https://f8f2-118-150-219-108.jp.ngrok.io/api';

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


// 取得_所有推文
export const getTopUser = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/followships/top`);
    // 這裡一直被反覆執行?
    console.log('res', res)
    return res.data;
  } catch (err) {
    console.error('[Get Top Users failed]:', err);
  }
}

// 新增_追蹤使用者
export const addFollowing = async (followingId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id: followingId
    });
    console.log('res', res)
    return res.status === 'status'
  } catch (err) {
    console.error('[Add Following failed]:', err);
  }
}

// 刪除_追蹤的使用者
export const removeFollowing = async (followingId, userId) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/followships/${followingId}`, { id: userId });
    console.log('removeFollowing', 'res', res)
    return res.status === 'status'
  } catch (err) {
    console.error('[Remove Following failed]:', err);
  }
}

// 使用者可以看到_某追隨使用者的人 follower
// /api/users/:id/followers
export const getUserFollowers = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/followers`);
    // 這裡一直被反覆執行?
    console.log('res', res)
    return res.data;
  } catch (err) {
    console.error('[Get Followers failed]:', err);
  }
}


// 使用者可以看到_某使用者追隨中的人 following
// /api/users/:id/followings
export const getUserFollowings = async (userId) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users/${userId}/followings`);
    // 這裡一直被反覆執行?
    console.log('res', res)
    return res.data;
  } catch (err) {
    console.error('[Get Followings failed]:', err);
  }
}

// Test
export const testAddFollowing = async (followingId) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/followships`, {
      id: followingId
    });
    console.log('res', res)
    return res.data
  } catch (err) {
    console.error('[Add Following failed]:', err);
  }
}

// 刪除_追蹤的使用者
export const testRemoveFollowing = async (followingId, userId) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/followships/${followingId}`, { id: userId });
    console.log('removeFollowing', 'res', res)
    return res.data
  } catch (err) {
    console.error('[Remove Following failed]:', err);
  }
}