import { useState } from "react";
import style from "./../TweetList/TweetList.module.scss";
import { Link } from "react-router-dom";

const FollowList = ({ follows, type, onClick, currentUserId, show }) => {
  console.log('type', type)
  console.log('followsssss:', follows)

  if ((follows.length = 0)) {
    return (
      <div className={style.userList + ' ' + (show ? style.show : '')}>
        <p>目前無任何{type === 'followers' ? '跟隨者' : '正在跟隨者'}</p>
      </div>
    )
  }


  if (follows.length > 0) {
    return (
      <div className={style.userList + ' ' + (show ? style.show : '')}>
        {
          follows.map((user, index) =>
            <div className={style.follow} key={user.id}>
              <Link className={style.name} to={'/userSelf/' + user.id} >
                <div className={style.avatar}>
                  <img src={user.avatar} alt="" />
                </div>
              </Link>
              <div className={style.info}>
                <div className={style.top}>
                  <div className={style.name}>
                    {user.name || ''}
                  </div>
                  <button
                    className={style.btn + ' ' +
                      (user.isFollowed ? style.active : '' + (currentUserId === user?.id ? style.disabled : ''))}
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
}

export default FollowList