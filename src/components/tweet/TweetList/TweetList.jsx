import { Link, useNavigate } from "react-router-dom";
import style from "./TweetList.module.scss";

const TweetList = ({ tweets, onClickReply, onClickLike, onClickLink }) => {
  const navigate = useNavigate();

  return (
    <div className="tweetList">
      {
        tweets.map(tweet =>
          <div className={style.tweet + ' ' + style.pointer} key={tweet.id} onClick={() => onClickLink?.(tweet.id)}>
            <div className={style.avatar} onClick={(e) => e.stopPropagation() & navigate('/userSelf/' + tweet.User.id)} >
              <img src={tweet.User.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <div className={style.name} onClick={(e) => e.stopPropagation() & navigate('/userSelf/' + tweet.User.id)} >
                  {tweet.User.name}
                </div>
                <div className={style.account} onClick={(e) => e.stopPropagation() & navigate('/userSelf/' + tweet.User.id)} >
                  @{tweet.User.account}
                </div>
                <div className={style.time}>{tweet.createdAt}</div>
              </div>
              <div className={style.description} >
                {tweet.description}
              </div>
              <div className={style.toolbar}>
                <button onClick={(e) => e.stopPropagation() & onClickReply?.({ ...tweet })}
                  className={style.toolButton + ' ' + style.replyCount} >
                  {tweet.replyCount}
                </button>
                <button onClick={(e) => e.stopPropagation() & onClickLike?.({ ...tweet })}
                  className={style.toolButton + ' ' + style.likeCount + ' ' + (!!tweet.isLiked ? style.active : '')} >
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

export default TweetList