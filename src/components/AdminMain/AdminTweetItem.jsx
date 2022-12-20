import styles from './AdminTweetItem.module.scss'
import logo from './../../image/Icon@2x.jpg'
import crossed from './../../image/VectorCrossed@2x.jpg'

const AdminTweetItem = ({ tweet, onDelete}) => {
  return (
    <div className={styles.tweetItem}>
      <img src={tweet.user.avatar ? tweet.user.avatar : logo} alt="avatar" className={styles.avatar}/>

      <div className={styles.userTag}>
        <span className={styles.userName}>{tweet.user.userName ? tweet.user.userName : 'Apple'}</span>
        <span className={styles.userAccount}>@{tweet.user.account ? tweet.user.account : 'apple'}・{tweet.date ? tweet.date : 3} 小時</span>
      </div>
      
      <p>{tweet.text ? tweet.text : 'test test test! Myname is gg easy now'}
      </p>

      <button
        onClick={() => onDelete?.(tweet.id)} 
        className={styles.deleteTweet}
      >
        <img src={crossed} alt="crossed" />
      </button>
    </div>
  )
}

export default AdminTweetItem