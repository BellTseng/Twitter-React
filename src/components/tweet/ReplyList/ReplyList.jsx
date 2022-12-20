
import style from './../TweetList/TweetList.module.scss';

const ReplyList = ({ replys }) => {
  console.log('replys:', replys)
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
                <div className={style.time}>{tweet.time}</div>
              </div>
              <div className={style.replyAccount}>回覆
                <span>@{tweet.User.account}</span>
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

export default ReplyList;