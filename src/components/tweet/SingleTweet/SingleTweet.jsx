import { Link } from "react-router-dom";
import style from './SingleTweet.module.scss'

const SingleTweet = ({
  tweet,
  onClickReply,
  onClickLike
}) => {
  return (
    <div className={style.tweet}>
      <div className={style.top}>
        <div className={style.avatar}>
          <img src={tweet.User.avatar} alt="" />
        </div>
        <div className={style.flexColumn}>
          <Link className={style.name}
            to={'/userSelf/' + tweet.User.id} >
            {tweet.User.name}
          </Link>
          <Link className={style.account}
            to={'/userSelf/' + tweet.User.id}>
            @{tweet.User.account}
          </Link>
        </div>
      </div>
      <div className={style.description}> {tweet.description}</div>
      <div className={style.time}>{tweet.createdAt}</div>
      <div className={style.count}>
        <p className={style.number}><span>{tweet.replyCount}</span> 回覆 </p>
        <p className={style.number}><span>{tweet.likeCount}</span> 喜歡次數 </p>
      </div>
      <div className={style.toolbar}>
        <div
          className={style.toolButton + ' ' + style.replyCount}
          onClick={onClickReply}
        >
          {/* {replyCount} */}
        </div>
        <div
          className={
            style.toolButton + ' ' + style.likeCount + ' '
            + (!!tweet.isLiked ? style.active : '')}
          onClick={onClickLike}
        >
          {/* {likeCount} */}
        </div>
      </div>
    </div>
  )
}


export default SingleTweet