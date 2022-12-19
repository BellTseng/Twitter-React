import style from './../TweetList/TweetList.module.scss';

const SingleTweetForReply = ({ id, User, time, description }) => {
  return (
    <div className={style.replyTweet}>
      <div className={style.avatar}>
        <img src={User.avatar} alt="" />
      </div>
      <div className={style.info}>
        <div className="top">
          <div className={style.name}>
            {User.name}
            <span className={style.account}>@{User.account}</span>
            <span className={style.time}> - {time}</span>
          </div>

        </div>
        <div className={style.description}> {description}
        </div>
        <div>回覆給  <span className={style.account}>@{User.account}</span></div>
      </div>


    </div>
  )
}


export default SingleTweetForReply