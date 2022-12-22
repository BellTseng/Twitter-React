import style from './PopularUser.module.scss';
import { useState, useEffect } from "react";
import { useAuth } from "./../../contexts/AuthContext";
import { getTopUser, addFollowing, removeFollowing } from "./../../api/followship";


const PopularUser = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [popularList, setPopularList] = useState([]);

  const handleClick = async (followingId, isFollowed) => {
    console.log('followingId', followingId, 'isFollowed', isFollowed)

    setPopularList(popularList.map(p => {
      if (p.id === followingId) {
        return { ...p, isFollowed: !isFollowed }
      } else {
        return p
      }
    }))

    try {
      if (isFollowed) {
        // 取消追蹤
        await removeFollowing(followingId, currentUser.id)
      }
      if (!isFollowed) {
        // 追蹤
        await addFollowing(followingId)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (isAuthenticated) {
      const getRepliesAsync = async () => {
        const topUsers = await getTopUser();
        console.log('topUsers', topUsers);
        setPopularList(topUsers);
      }
      getRepliesAsync();
    }
  }, [isAuthenticated]);

  return (
    <section className={style.popular}>
      <h2 className={style.h2}>推薦跟隨</h2>
      <ul className={style.popularList}>
        {popularList.map(user =>
          <li key={user.id}>
            <div className={style.info}>
              <div className={style.avatar}>
                <img src={user.avatar} alt="" />
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
              className={style.btn + ' '
                + (user.isFollowed ? style.active : '') + ' ' +
                (currentUser.id === user.id ? style.none : '')
              }
              onClick={() => {
                handleClick?.(user.id, user.isFollowed)
              }}>
              {user.isFollowed ? '正在跟隨' : '跟隨'}
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}

export default PopularUser