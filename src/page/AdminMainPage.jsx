import AdminMainTweetList from './../components/AdminMain/AdminMainTweetList'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { adminDeleteTweet, adminGetTweets } from '../api/admin'
import Swal from 'sweetalert2'

// const tweetList = [
//   {
//     id: 1,
//     date: 36,
//     text: 'nothing',
//     user: {
//       avatar: 'https://play-lh.googleusercontent.com/69DEGMGZWRsrGy6AyIZ3k8xJGMGXHfr6jzn63IBBcyD3CgyixnmRZIfMf0QrbdWUQTBg=w240-h480-rw',
//       userName: 'Allen',
//       account: 'Joe123'
//     }
//   },
//   {
//     id: 2,
//     date: 45,
//     text: 'nothing is over',
//     user: {
//       avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
//       userName: 'Allen',
//       account: 'Joe456'
//     }
//   }
// ]

const AdminMainPage = () => {
  const [tweets, setTweets] = useState([])
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate()


  async function handleDelete(id) {

    Swal.fire({
      title: '確定是否刪除?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '刪除',
      cancelButtonText: '取消'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const response = await adminDeleteTweet(id)

        if (response.status === 'success'){
          setTweets((prevTweets) => prevTweets.filter(tweet => tweet.id !== id))
          Swal.fire({
            title: `${response.message}`,
            icon: 'success'
          })
          return
        }
        else{
          return
        } 
      }
    })
  }

  useEffect(() => {
    if (!isAuthenticated){
      navigate('/admin/login')
    }

  }, [isAuthenticated, navigate])

  useEffect(() => {
    async function getadminTweetsAsync() {
      const admintweets = await adminGetTweets();

      setTweets(
        admintweets.map((tweet) => {
          return {
            ...tweet
          };
        }),
      );
    }

    getadminTweetsAsync()
  },[])

  return(
    <>
      <AdminMainTweetList 
        tweets={tweets}
        onDelete={handleDelete}
      />
    </>
  )
}

export default AdminMainPage