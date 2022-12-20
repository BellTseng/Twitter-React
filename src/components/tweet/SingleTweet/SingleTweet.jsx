import { Link } from "react-router-dom";
import style from './SingleTweet.module.scss'

const SingleTweet = ({ id, User, time, description, replyCount, likeCount, isLiked, onClickReply, onClickLike }) => {
  return (
    <div className={style.tweet}>
      <div className={style.top}>
        <div className={style.avatar}>
          <img src={User.avatar} alt="" />
        </div>
        <div>
          <Link className={style.name} to={'/userSelf/' + User.id} > {User.name}</Link>
          <Link className={style.account} to={'/userSelf/' + User.id}>@{User.account}</Link>
        </div>
      </div>
      <div className={style.description}> {description}</div>
      <div className={style.time}>{time}</div>
      <div className={style.count}>
        <p className={style.number}><span>{replyCount}</span> 回覆 </p>
        <p className={style.number}><span>{likeCount}</span> 喜歡次數 </p>
      </div>
      <div className={style.toolbar}>
        <div
          className={style.toolButton + ' ' + style.replyCount}
          onClick={() => onClickReply}
        >
          {/* {replyCount} */}
        </div>
        <div
          className={
            style.toolButton + ' ' + style.likeCount + ' '
            + (!!isLiked ? style.active : '')}
          onClick={onClickLike}
        >
          {/* {likeCount} */}
        </div>
      </div>
    </div>
  )
}


export default SingleTweet