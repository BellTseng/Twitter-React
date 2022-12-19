import { useState } from "react"
import { useParams } from "react-router-dom"
import UserSelfArea from "../components/UserPage/UserSelfArea"

const userPro = {
  id: 1,
  background: 'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2020/11/07/20201107-092915_U13380_M651499_4ac4.jpg?itok=6KFZde7p',
  avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
  introduction: 'My name is Allen.',
  userName: 'Allen',
  account: 'Joe456',
  tweetCount: '1.8k',
  likeCount: '50k',
  folloingCount: 1000,
  followerCount: 80,
  isFollow: false,
}

const UserSelfPage = () => {
  const [userInfo, setUserInfo] = useState(userPro)
  const [userTabId, setUserTabId] = useState(1)
  const [isOpen, setIsOpen] = useState(false) //Modal show useState
  const userId = 1
  const { id } = useParams()


  function handleToggleFollow(id) {
    setUserInfo((prevUser) => {
      return{
        ...prevUser,
        isFollow: !prevUser.isFollow
      }
    })
  }

  function handleChangeTab(value) {
    setUserTabId(value)
  }

  function changeModalStatus(value) {
    setIsOpen(value)
  }

  return (
    <UserSelfArea
      isOpen={isOpen} 
      user={userInfo}
      userId={userId}
      tabId={userTabId}
      paramsId={Number(id)}
      onToggleFollow={handleToggleFollow}
      onChangeTab={handleChangeTab}
      onShowModal={changeModalStatus}
    />
  )
}

export default UserSelfPage