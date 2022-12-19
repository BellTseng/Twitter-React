import { useState } from "react";
import style from "./../TweetList/TweetList.module.scss";
import { Link } from "react-router-dom";

const FollowList = ({ follows, onClick }) => {
  console.log('follows:', follows)

  // [v] 點推文
  // [ ] 回覆
  // [ ] 按讚



  return (
    <div className="userList">
      {
        follows.map(user =>
          <div className={style.follow} key={user.followingId}>
            <div className={style.avatar}>
              <img src={user.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <div className={style.name}>
                  {user?.name || ''}
                </div>
                <button disabled="false"
                  className={style.btn + ' '
                    + (user.isFollowed === 1 ? style.active : '')}
                  onClick={() => {
                    onClick?.(user.id)
                  }}>
                  {follows.includes(user.id) ? '正在跟隨' : '跟隨'}
                </button>
              </div>
              <div className={style.introduction}>
                {user?.introduction || ''}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default FollowList