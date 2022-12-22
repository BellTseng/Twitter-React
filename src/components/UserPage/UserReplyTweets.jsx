
import style from './../tweet/TweetList/TweetList.module.scss';

const UserReplyTweets = ({ replys }) => {
  return (
    <div className="tweetList">
      {
        replys.map(tweet =>
          <div className={style.tweet} key={tweet.id}>
            <div className={style.avatar}>
              <img src={tweet.User.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <div className={style.name}>{tweet.User.name}</div>
                <div className={style.account}>@{tweet.User.account}</div>
                <div className={style.time}>{tweet.createdAt}</div>
              </div>
              <div className={style.replyAccount}>回覆
                <span>@{tweet.Tweet.User.account ? tweet.Tweet.User.account : 'test'}</span>
              </div>
              <div className={style.commend}>
                {tweet.comment}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserReplyTweets;