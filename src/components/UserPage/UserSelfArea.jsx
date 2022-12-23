import styles from './UserSelfArea.module.scss'
import Arrow from './../../image/VectorArrow@2x.jpg'
import UserInfo from './UserInfo'
import UserTab from './UserTab'
import { Link } from 'react-router-dom'
import UserOwnTweetList from './UserOwnTweetList'
import UserLikeTweets from './UserLikeTweets'
import UserReplyTweets from './UserReplyTweets'
import Modal from '../modal/Modal'
import SingleTweetForReply from '../tweet/SingleTweetForReply/SingleTweetForReply'
import TweetEdit from '../tweet/TweetEdit/TweetEdit'

const UserSelfArea = ({
  tweets,
  replies,
  likes, 
  isOpen,
  user, 
  userId, 
  paramsId,
  tabId, 
  replyModalStatus,
  chooseTweet,
  onAddFollow,
  onCancelFollow,
  onChangeTab,
  onShowModal,
  onClickReply,
  onClickLike,
  onClickCreateReply,
  onClickCloseReplyModal
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
          onClickReply={(tweet) => onClickReply?.(tweet)}
          onClickLike={(tweet) => onClickLike?.(tweet)}
        />
        :
        ''
      }
      {(tabId === 2 && replies) ?
        <UserReplyTweets replys={replies ? replies : ''} /> : ''
      }
      {(tabId === 3 && likes) ?
        <UserLikeTweets 
          tweets={likes ? likes : ''}
          onClickReply={(tweet) => onClickReply?.(tweet)}
          onClickLike={(tweet) => onClickLike?.(tweet)} 
        /> :''
      }

      <Modal isOpen={replyModalStatus} closeModal={() => onClickCloseReplyModal?.()}>
        {replyModalStatus &&
          <>
            <SingleTweetForReply
              tweet={chooseTweet}
            />
            <TweetEdit
              name='回覆'
              placeholder='推你的回覆'
              onClick={(value) => onClickCreateReply?.(value)}
            />
          </>
        }
      </Modal>
    </div>
  )
}

export default UserSelfArea