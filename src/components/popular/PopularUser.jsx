import style from './PopularUser.module.scss';
import { useState } from "react";


const PopularUser = () => {
  const defaultPopularlist = [{
    "id": 1,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  }, {
    "id": 2,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  }, {
    "id": 3,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  }, {
    "id": 4,
    "account": "user1",
    "name": "User1",
    "avatar": "https://loremflickr.com/320/240/logo/?lock=1"
  }
  ];
  const [popularList, setPopularList] = useState(defaultPopularlist);
  const [followList, setFollowList] = useState([1]);

  const handleClick = (id) => {
    if (followList.includes(id)) {
      setFollowList(followList.filter(followId => followId !== id));
    } else {
      setFollowList(followList.concat(id));
    }
  }
  return (
    <section className={style.popular}>
      <h2 className={style.h2}>Popular</h2>
      <ul className={style.popularList}>
        {popularList.map(user =>
          <li key={user.id}>
            <div className={style.info}>
              <div className={style.avatar}><img src={user.avatar} alt="" />
              </div>
              <div>
                <div className={style.name}>
                  {user.name}
                </div>
                <div className={style.account}>
                  @{user.account}
                </div>
              </div>
            </div>
            <button
              className={style.btn + ' ' + (followList.includes(user.id) ? style.active : '')}
              onClick={() => {
                handleClick?.(user.id)
              }}>
              {followList.includes(user.id) ? '正在跟隨' : '跟隨'}
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}

export default PopularUser