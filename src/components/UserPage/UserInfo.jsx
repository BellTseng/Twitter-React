import styles from './UserInfo.module.scss'
import email from './../../image/VectorEmail@2x.jpg'
import subscription from './../../image/VectorSubscription@2x.jpg'
import UserModal from '../modal/UserModal'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

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

  return (
    <div className={styles.userInfo}>
      <img
        className={styles.background}
        src={user.cover ? user.cover : "https://i.imgur.com/D6f1MZe.png"}
        alt="background"
      />

      <img
        className={styles.avatar}
        src={user.avatar ? user.avatar : "https://i.imgur.com/zC0XOiB.png"}
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
              {(user.isFollowed === 1) &&
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
        <Link to={`/follow/${user.id}?tab=1`}>
          <p className={styles.following}>{user.followingCount ? user.followingCount : 0}個<span>跟隨中</span></p>
        </Link>
        <Link to={`/follow/${user.id}?tab=0`}>
          <p className={styles.follower}>{user.followerCount ? user.followerCount : 0}位<span>跟隨者</span></p>
        </Link>

      </div>


      <UserModal
        isOpen={isOpen}
        onShowModal={(value) => onShowModal?.(value)}
      />

    </div>
  )
}

export default UserInfo