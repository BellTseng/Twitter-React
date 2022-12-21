import styles from './AdminTweetItem.module.scss'
import logo from './../../image/Icon@2x.jpg'
import crossed from './../../image/VectorCrossed@2x.jpg'

const AdminTweetItem = ({ tweet, onDelete}) => {
  return (
    <div className={styles.tweetItem} id={tweet.id}>
      <img src={tweet.User.avatar ? tweet.User.avatar : logo} alt="avatar" className={styles.avatar}/>

      <div className={styles.userTag}>
        <span className={styles.userName}>{tweet.User.name ? tweet.User.name : 'Apple'}</span>
        <span className={styles.userAccount}>@{tweet.User.account ? tweet.User.account : 'apple'}・{tweet.createdAt ? tweet.createdAt : '3小時'} </span>
      </div>
      
      <p>{tweet.description ? ((tweet.description.length < 50) ? tweet.description : `${tweet.description}...`) : 'test test test! Myname is gg easy now'}
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