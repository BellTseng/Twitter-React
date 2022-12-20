import styles from './UserSelfArea.module.scss'
import Arrow from './../../image/VectorArrow@2x.jpg'
import UserInfo from './UserInfo'
import UserTab from './UserTab'
import { Link } from 'react-router-dom'

const UserSelfArea = ({ 
  isOpen,
  user, 
  userId, 
  paramsId,
  tabId, 
  onToggleFollow,
  onChangeTab,
  onShowModal,
}) => {
  return(
    <div className={styles.userSelfArea}>
      <div className={styles.title}>
        <Link to='/home'>
          <img src={Arrow} alt="arrow" />
        </Link>
        <div className={styles.userTag}>
          <h5 className={styles.userName}>{user.userName}</h5>
          <p className={styles.tweetCount}>25 推文</p>
        </div>
      </div>
      
      <UserInfo
        isOpen={isOpen} 
        user={user}
        userId={userId}
        paramsId={paramsId}
        onToggleFollow={(id) => onToggleFollow?.(id)}
        onShowModal={(value) => onShowModal?.(value)}
      />

      <UserTab 
        tabId={tabId}
        onChangeTab={(value) => onChangeTab?.(value)}
      />
    </div>
  )
}

export default UserSelfArea