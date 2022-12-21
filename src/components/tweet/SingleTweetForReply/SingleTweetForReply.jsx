import style from './../TweetList/TweetList.module.scss';

const SingleTweetForReply = ({ tweet }) => {
  return (
    <div className={style.replyTweet}>
      <div className={style.avatar}>
        <img src={tweet.User.avatar} alt="" />
      </div>
      <div className={style.info}>
        <div className="top">
          <div className={style.name}>
            {tweet.User.name}
            <span className={style.account}>@{tweet.User.account}</span>
            <span className={style.time}> {tweet.createdAt}</span>
          </div>

        </div>
        <div className={style.description}> {tweet.description}
        </div>
        <div className={style.replyAccount}>回覆給
          <span className={style.account}>
            @{tweet.User.account}
          </span>
        </div>
      </div>


    </div>
  )
}


export default SingleTweetForReply