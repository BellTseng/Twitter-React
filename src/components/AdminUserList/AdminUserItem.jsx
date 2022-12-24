import styles from './AdminUserItem.module.scss'
import tweetCount from './../../image/VectorTweetCount@2x.jpg'
import tweetLike from './../../image/VectorTweetLike@2x.jpg'

const AdminUserItem = ({ user }) => {
  return(
    <div className={styles.userItem}>
      <img 
        className={styles.background}
        src={user.cover ? user.cover : "https://i.imgur.com/D6f1MZe.png"} 
        alt="background" 
      />

      <img 
        className={styles.avatar}
        src={user.avatar ? user.avatar : "https://i.imgur.com/zC0XOiB.png" }
        alt="avatar" 
      />

      <div className={styles.userTag}>
        <p className={styles.userName}>{user.name ? user.name : ''}</p>
        <p className={styles.userAccount}>@{user.account ? user.account : ''}</p>
      </div>
      
      <div className={styles.userTweetLike}>
        <div className={styles.tweetCount}>
          <img
            src={tweetCount}
            alt="tweetCount"
          />
          <span>{user.tweetCount ? user.tweetCount : 0}</span>
        </div>

        <div className={styles.tweetLike}>
          <img
            src={tweetLike}
            alt="tweetLike"
          />
          <span>{user.likeCount ? user.likeCount : 0}</span>
        </div>
      </div>

      <div className={styles.userPopular}>
        <p className={styles.following}>{user.followingCount ? user.followingCount : 0}個<span>跟隨中</span></p>
        <p className={styles.follower}>{user.followerCount ? user.followerCount : 0}位<span>跟隨者</span></p>
      </div>
      
    </div>
  )
}

export default AdminUserItem