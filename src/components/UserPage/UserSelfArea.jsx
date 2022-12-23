import styles from './UserSelfArea.module.scss'
import Arrow from './../../image/VectorArrow@2x.jpg'
import UserInfo from './UserInfo'
import UserTab from './UserTab'
import { Link } from 'react-router-dom'
import UserOwnTweetList from './UserOwnTweetList'
import UserLikeTweets from './UserLikeTweets'
import ReplyList from '../tweet/ReplyList/ReplyList'
import UserReplyTweets from './UserReplyTweets'

const UserSelfArea = ({
  tweets,
  replies,
  likes, 
  isOpen,
  user, 
  userId, 
  paramsId,
  tabId, 
  onAddFollow,
  onCancelFollow,
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
          <h5 className={styles.userName}>{user.name}</h5>
          <p className={styles.tweetCount}>{user.tweetCount} 推文</p>
        </div>
      </div>
      
      <UserInfo
        isOpen={isOpen} 
        user={user}
        userId={userId}
        paramsId={paramsId}
        onAddFollow={(id) => onAddFollow?.(id)}
        onCancelFollow={(id, currentUserId) => onCancelFollow?.(id, currentUserId)}
        onShowModal={(value) => onShowModal?.(value)}
      />

      <UserTab 
        tabId={tabId}
        onChangeTab={(value) => onChangeTab?.(value)}
      />

      {(tabId === 1 && tweets) ?
        <UserOwnTweetList 
          tweets={tweets ? tweets : ''}
        />
        :
        ''
      }
      {(tabId === 2 && replies) ?
        <UserReplyTweets replys={replies ? replies : ''} /> : ''
      }
      {(tabId === 3 && likes) ?
        <UserLikeTweets tweets={likes ? likes : ''} /> :''
      }
    </div>
  )
}

export default UserSelfArea