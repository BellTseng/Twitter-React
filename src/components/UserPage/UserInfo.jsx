import styles from './UserInfo.module.scss'
import email from './../../image/VectorEmail@2x.jpg'
import subscription from './../../image/VectorSubscription@2x.jpg'
import UserModal from '../modal/UserModal'
import { useAuth } from '../../contexts/AuthContext'

const UserInfo = ({ 
  isOpen,
  user, 
  userId, 
  paramsId, 
  onAddFollow,
  onCancelFollow,
  onShowModal 
}) => {
  const { currentUser } = useAuth()

  return(
    <div className={styles.userInfo}>
      <img
        className={styles.background}
        src={user.cover ? user.cover : "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg"}
        alt="background"
      />

      <img
        className={styles.avatar}
        src={user.avatar ? user.avatar : "https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj"}
        alt="avatar"
      />

      <div className={styles.buttonGroup}>
        {(userId === paramsId) &&
          <div className={styles.editButton}>
            <button
              onClick={() => onShowModal?.(true)}
            >
              編輯個人資料
            </button>
          </div>
        }
        {(userId !== paramsId) &&
          <div className={styles.otherButton}>
            <button className={styles.email}>
              <img src={email} alt="email" />
            </button>
            <button className={styles.subscription}>
              <img src={subscription} alt="subscription" />
            </button>
            <div className={styles.followed}>
              {(user.isFollowed) && 
                <button 
                  className={styles.active} 
                  onClick={() => onCancelFollow?.(user.id, currentUser.id)}
                >
                  正在跟隨
                </button>
              }

              {(!user.isFollowed) && 
                <button
                  onClick={() => onAddFollow?.(user.id)}
                >
                  跟隨
                </button>
              }
            </div>
          </div>
        }
      </div>

      <div className={styles.userTag}>
        <h5 className={styles.userName}>{user.name ? user.name : 'Jas'}</h5>
        <p className={styles.userAccount}>@{user.account ? user.account : 'ggg123456'}</p>
      </div>

      <div className={styles.userIntroduction}>
        <p>{user.introduction ? user.introduction : 'test! test! test!'}</p>
      </div>


      <div className={styles.userPopular}>
        <p className={styles.following}>{user.followingCount ? user.followingCount : '59'}個<span>跟隨中</span></p>
        <p className={styles.follower}>{user.followerCount ? user.followerCount : '230'}位<span>跟隨者</span></p>
      </div>

      
      <UserModal
        isOpen={isOpen}
        onShowModal={(value) => onShowModal?.(value)}
      />
      
    </div>
  )
}

export default UserInfo