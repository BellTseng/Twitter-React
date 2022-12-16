import styles from './UserSelfArea.module.scss'
import Arrow from './../../image/VectorArrow@2x.jpg'
import UserInfo from './UserInfo'
import { Link } from 'react-router-dom'

const UserSelfArea = ({ user, userId, paramsId }) => {
  return(
    <div className={styles.userSelfArea}>
      <div className={styles.title}>
        <Link to='/home'>
          <img src={Arrow} alt="arrow" />
        </Link>
        <div className={styles.userTag}>
          <h5 className={styles.userName}>John Doe</h5>
          <p className={styles.tweetCount}>25 推文</p>
        </div>
      </div>
      
      <UserInfo 
        user={user}
        userId={userId}
        paramsId={paramsId}
      />
    </div>
  )
}

export default UserSelfArea