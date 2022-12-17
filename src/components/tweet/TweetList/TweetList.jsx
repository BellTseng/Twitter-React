import { useState } from "react";
import style from "./TweetList.module.scss";
import { Link } from "react-router-dom";

const TweetList = () => {
  const defaultTweetList = [{
    "id": 1,
    "description": "deserunt qui. Error optio sapient",
    "UserId": 2,
    "createdAt": "2022-12-11T01:19:30.000Z",
    "updatedAt": "2022-12-11T01:19:30.000Z",
    "replyCount": 4,
    "likeCount": 0,
    "User": {
      "id": 2,
      "account": "user1",
      "name": "User1",
      "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
    },
    "isLiked": false
  }, {
    "id": 11,
    "description": "deserunt qui. Error optio sapient",
    "UserId": 21,
    "createdAt": "2022-12-11T01:19:30.000Z",
    "updatedAt": "2022-12-11T01:19:30.000Z",
    "replyCount": 41,
    "likeCount": 2,
    "User": {
      "id": 21,
      "account": "user1",
      "name": "User1",
      "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
    },
    "isLiked": false
  },
  ];

  // [v] 點推文
  // [ ] 回覆
  // [ ] 按讚

  const [tweets, setTweets] = useState(defaultTweetList);

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