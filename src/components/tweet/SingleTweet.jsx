const SingleTweet = ({ id, User, time, description, replyCount, likeCount }) => {
  return (
    <div className="tweet">
      <div className="tweetAvatar">
        <img src={User.avatar} alt="" />
      </div>
      <div className="tweetInfo">
        <div className="top">
          <div className="name">{User.name}</div>
          <div className="account">@{User.account}</div>
          <div className="time">{time}</div>
        </div>
        <div className="content">
          {description}
        </div>
        <div className="toolbar">
          <div className="replyCount">{replyCount}</div>
          <div className="likeCount">{likeCount}</div>
        </div>
      </div>
    </div>
  )
}


export default SingleTweet