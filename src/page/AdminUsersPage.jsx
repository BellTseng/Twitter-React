import { useState } from 'react'
import AdminUserList from './../components/AdminUserList/AdminUserList'

const users = [
  {
    id: 1,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
    userName: 'Allen',
    account: 'Joe456',
    tweetCount: '1.8k',
    likeCount: '50k',
    folloingCount: 1000,
    followerCount: 80,
  },
  {
    id: 2,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj',
    userName: 'Jas',
    account: 'KKK789',
    tweetCount: '20k',
    likeCount: '10k',
    folloingCount: 200,
    followerCount: 880,
  },
  {
    id: 3,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
    userName: 'Allen',
    account: 'Joe456',
    tweetCount: '1.8k',
    likeCount: '50k',
    folloingCount: 1000,
    followerCount: 80,
  },
  {
    id: 4,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj',
    userName: 'Jas',
    account: 'KKK789',
    tweetCount: '20k',
    likeCount: '10k',
    folloingCount: 200,
    followerCount: 880,
  },
  {
    id: 5,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
    userName: 'Allen',
    account: 'Joe456',
    tweetCount: '1.8k',
    likeCount: '50k',
    folloingCount: 1000,
    followerCount: 80,
  },
  {
    id: 6,
    bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
    avatar: 'https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj',
    userName: 'Jas',
    account: 'KKK789',
    tweetCount: '20k',
    likeCount: '10k',
    folloingCount: 200,
    followerCount: 880,
  },
]

const AdminUsersPage = () => {
  const [usersList, setUsersList] = useState(users)

  return(
    <>
      <AdminUserList 
        userList={usersList}
      />
    </>
  )
}

export default AdminUsersPage