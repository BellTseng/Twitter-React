import { Link } from 'react-router-dom'
import style from './UserOwnTweetList.module.scss'


const UserOwnTweetList = ({ tweets }) => {
  return (
    <div className="tweetList">
      {
        tweets.map(tweet =>
          <div className={style.tweet} key={tweet.id}>
            <div className={style.avatar}>
              <img src={tweet.Tweet.User.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <p className={style.name}> {tweet.Tweet.User.name}</p>
                <p className={style.account}>@{tweet.Tweet.User.account}</p>
                <div className={style.time}>{tweet.createdAt}</div>
              </div>
              <Link to={'/replylist/' + tweet.Tweet.id} className={style.description}>
                {tweet.Tweet.description}
              </Link>
              <div className={style.toolbar}>
                <button
                  className={style.toolButton + ' ' + style.replyCount}
                >
                  {tweet.Tweet.replyCount}
                </button>
                <button
                  className={style.toolButton + ' ' + style.likeCount + ' ' + style.active}
                >
                  {tweet.Tweet.likeCount}
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