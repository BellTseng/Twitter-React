import styles from './AdminMainTweetList.module.scss'
import AdminTweetItem from './AdminTweetItem'



const AdminMainTweetList = ({ tweets, onDelete}) => {
  

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
              onDelete={(id) => onDelete?.(id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AdminMainTweetList