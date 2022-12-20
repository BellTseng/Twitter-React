import style from './SingleTweet.module.scss'

const SingleTweet = ({ id, User, time, description, replyCount, likeCount, isLiked }) => {
  return (
    <div className={style.tweet}>
      <div className={style.top}>
        <div className={style.avatar}>
          <img src={User.avatar} alt="" />
        </div>
        <div>
          <div className={style.name}>{User.name}</div>
          <div className={style.account}>@{User.account}</div>
        </div>
      </div>
      <div className={style.description}> {description}</div>
      <div className={style.time}>{time}</div>
      <div className={style.count}>
        <p className={style.number}><span>34</span> 回覆 </p>
        <p className={style.number}><span>808</span> 喜歡次數 </p>
      </div>
      <div className={style.toolbar}>
        <div className={style.toolButton + ' ' + style.replyCount}>
          {/* {replyCount} */}
        </div>
        <div className={
          style.toolButton + ' '
          + style.likeCount + ' '
          + (!!isLiked ? style.active : '')
        }>
          {/* {likeCount} */}
        </div>
      </div>
    </div>
  )
}


export default SingleTweet