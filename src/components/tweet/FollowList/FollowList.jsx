import { useState } from "react";
import style from "./../TweetList/TweetList.module.scss";
import { Link } from "react-router-dom";

const FollowList = ({ follows, type, onClick, disabled }) => {
  console.log('type', type)
  console.log('followsssss:', follows)


  return (
    <div className="userList">
      {
        follows.map(user =>
          <div className={style.follow} key={user.id}>
            <div className={style.avatar}>
              <img src={user.avatar} alt="" />
            </div>
            <div className={style.info}>
              <div className={style.top}>
                <div className={style.name}>
                  {user.name || ''}
                </div>
                <button
                  disabled={disabled}
                  className={style.btn + ' ' +
                    (user.isFollowed ? style.active : '' + (disabled ? style.disabled : ''))}
                  onClick={() => { onClick?.({ ...user }, type) }}
                >
                  {user.isFollowed ? '正在跟隨' : '跟隨'}
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