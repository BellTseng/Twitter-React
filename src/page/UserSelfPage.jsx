import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UserSelfArea from "../components/UserPage/UserSelfArea"
import { useAuth } from "../contexts/AuthContext"
import { getUser } from "../api/user"

// const userPro = {
//   id: 1,
//   background: 'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2020/11/07/20201107-092915_U13380_M651499_4ac4.jpg?itok=6KFZde7p',
//   avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
//   introduction: 'My name is Allen.',
//   userName: 'Allen',
//   account: 'Joe456',
//   tweetCount: '1.8k',
//   likeCount: '50k',
//   folloingCount: 1000,
//   followerCount: 80,
//   isFollow: false,
// }

const UserSelfPage = () => {
  const [userInfo, setUserInfo] = useState([])
  const [userTabId, setUserTabId] = useState(1)
  const [isOpen, setIsOpen] = useState(false) //Modal show useState
  const { currentUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  // const userId = 1
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

  useEffect(() => {
    async function getUserAsync() {
      const { data } = await getUser(Number(id))

      console.log('data', data)

      setUserInfo(data)
    }

    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    else {
      getUserAsync()
    }
  }, [isAuthenticated, navigate, id])

  return (
    <UserSelfArea
      isOpen={isOpen} 
      user={userInfo}
      userId={currentUser?.id}
      tabId={userTabId}
      paramsId={Number(id)}
      onToggleFollow={handleToggleFollow}
      onChangeTab={handleChangeTab}
      onShowModal={changeModalStatus}
    />
  )
}

export default UserSelfPage