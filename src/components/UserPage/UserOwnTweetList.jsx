import { Link } from 'react-router-dom'
import style from './UserOwnTweetList.module.scss'


const UserOwnTweetList = ({ tweets}) => {
  return (
    <div className="tweetList">
      {
        tweets.map(tweet =>
          <div className={style.tweet} key={tweet.id}>
            <div className={style.avatar}>
              <img src={tweet.User.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <p className={style.name}> {tweet.User.name}</p>
                <p className={style.account}>@{tweet.User.account}</p>
                <div className={style.time}>{tweet.createdAt}</div>
              </div>
              <Link to={'/replylist/' + tweet.id} className={style.description}>
                {tweet.description}
              </Link>
              <div className={style.toolbar}>
                <button
                  className={style.toolButton + ' ' + style.replyCount}
                >
                  {tweet.replyCount}
                </button>
                <button
                  className={style.toolButton + ' ' + style.likeCount + ' ' + (!!tweet.isLiked ? style.active : '')}
                >
                  {tweet.likeCount}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserOwnTweetList