import { useState } from 'react'
import styles from './AdminMainTweetList.module.scss'
import AdminTweetItem from './AdminTweetItem'


const tweetList = [
  {
    id: 1,
    date: 36,
    text: 'nothing',
    user: {
      avatar: 'https://play-lh.googleusercontent.com/69DEGMGZWRsrGy6AyIZ3k8xJGMGXHfr6jzn63IBBcyD3CgyixnmRZIfMf0QrbdWUQTBg=w240-h480-rw',
      userName: 'Allen',
      account: 'Joe123'
    }
  },
  {
    id: 2,
    date: 45,
    text: 'nothing is over',
    user: {
      avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
      userName: 'Allen',
      account: 'Joe456'
    }
  }
]

const AdminMainTweetList = () => {
  const [tweets, setTweets] = useState(tweetList)


  function handleDelete(id){
    console.log('delete')

    setTweets((prevTweets) => prevTweets.filter(tweet => tweet.id !== id))
  }

  return (
    <div className={styles.adminMain}>
      <div className={styles.title}>
        <h4>推文清單</h4>
      </div>
      <div className={`${styles.tweetList} ${styles.scrollbar}`}>
        {tweets.map((tweet) => {
          return(
            <AdminTweetItem
              key={tweet.id}
              tweet={tweet}
              onDelete={handleDelete}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AdminMainTweetList