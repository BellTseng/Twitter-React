import { useState } from "react"
import UserSelfArea from "../components/UserPage/UserSelfArea"

const userPro = {
  id: 1,
  bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
  avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
  introduction: 'My name is Allen.',
  userName: 'Allen',
  account: 'Joe456',
  tweetCount: '1.8k',
  likeCount: '50k',
  folloingCount: 1000,
  followerCount: 80,
}

const UserSelfPage = () => {
  const [userInfo, setUserInfo] = useState(userPro)

  return (
    <UserSelfArea 
      user={userInfo}
    />
  )
}

export default UserSelfPage