import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UserSelfArea from "../components/UserPage/UserSelfArea"
import { useAuth } from "../contexts/AuthContext"
import { getUser } from "../api/user"
import { getUserTweets, getUserReplyTweets, getUserLikeTweets } from './../api/tweet'
import { Toast } from "../utils/utils"
import { testAddFollowing, testRemoveFollowing } from './../api/followship'

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
  const [userInfo, setUserInfo] = useState([]) // userInfo
  const [userTweets, setUserTweets] = useState([]) // userOwnTweets
  const [userReplies, setUserReplies] = useState([]) // userReplyTweets
  const [userLikes, setUserLikes] = useState([]) // userLikeTweets
  const [userTabId, setUserTabId] = useState(1)
  const [isOpen, setIsOpen] = useState(false) //Modal show useState
  const { currentUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  // const userId = 1
  const { id } = useParams()


  async function handleAddFollow(id, currentUserId) {
    const response = await testAddFollowing(id, currentUserId)

    console.log('addfollow', response)

    if (response.status === "success"){
      setUserInfo((prevUser) => {
        return {
          ...prevUser,
          isFollowed: true
        }
      })

      Toast.fire({
        title: '追隨成功',
        icon: 'success'
      })
    }
    
  }

  async function handleCancelFollow(id) {
    const response = await testRemoveFollowing(id)

    console.log('cancelfollow', response)

    if(response.status === 'success'){
      setUserInfo((prevUser) => {
        return {
          ...prevUser,
          isFollowed: false
        }
      })

      Toast.fire({
        title: `${response.message}`,
        icon: 'success'
      })
    }

    
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
      const userOwnTweets = await getUserTweets(Number(id))
      const userReplyTweets = await getUserReplyTweets(Number(id))
      const userLikeTweets = await getUserLikeTweets(Number(id))

      console.log('UserData', data)
      console.log('UserTweets', userOwnTweets)
      console.log('UserReplies', userReplyTweets)
      console.log('UserLikes', userLikeTweets)

      setUserInfo(data)
      setUserTweets(userOwnTweets ?
        userOwnTweets.map((tweet) => {
          return{
            ...tweet,
            User: data
          }
        }) : ''
      )
      setUserReplies(userReplyTweets ? userReplyTweets : '')
      setUserLikes(userLikeTweets ? userLikeTweets : '')
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
      tweets={userTweets}
      replies={userReplies}
      likes={userLikes}
      isOpen={isOpen} 
      user={userInfo}
      userId={currentUser?.id}
      tabId={userTabId}
      paramsId={Number(id)}
      onAddFollow={handleAddFollow}
      onCancelFollow={handleCancelFollow}
      onChangeTab={handleChangeTab}
      onShowModal={changeModalStatus}
    />
  )
}

export default UserSelfPage