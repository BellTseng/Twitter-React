import { useState } from "react";
import style from "./TweetList.module.scss";
import { Link } from "react-router-dom";

const TweetList = ({ tweets }) => {

  // [v] 點推文
  // [ ] 回覆
  // [ ] 按讚

  return (
    <div className="tweetList">
      {
        tweets.map(tweet =>
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
              <Link to={'/replylist/' + tweet.id} className={style.description}>
                {tweet.description}
              </Link>
              <div className={style.toolbar}>
                <div className={style.toolButton + ' ' + style.replyCount}>{tweet.replyCount}</div>
                <div className={style.toolButton + ' ' + style.likeCount}>{tweet.likeCount}</div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TweetList