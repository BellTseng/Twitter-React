import FollowList from "../components/tweet/FollowList/FollowList"
import Header from "../components/layoutItems/Header";
import Tab from "../components/layoutItems/Tab"
import { defaultFollows } from "../data/tweets.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getUserFollowers, getUserFollowings, addFollowing, removeFollowing } from '../api/followship';
import { useAuth } from "../contexts/AuthContext";
import { getUser } from "./../api/user";

const FollowPage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  console.log('id', id);
  const [searchParams, setSearchParams] = useSearchParams();
  const initTab = Number(searchParams.get("tab")) || 0;
  console.log('initTab', initTab)
  const { currentUser, update, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [tabId, setUserTabId] = useState(initTab)
  const [user, setUser] = useState(null);


  // 切換tab
  // 依index顯示不同的資料
  const handleChangeTab = (value) => {
    console.log('value', value)
    setUserTabId(value)
  }

  // 切換跟隨者的人狀態
  const handleClick = async (followUser, type) => {
    console.log('followUser', followUser)
    console.log('type', type)
    // 1.切換跟隨者狀態
    // 2.也同時要從被跟隨者列表移除/加入
    // 3. 進行update，因為有可能影響到popular

    let newFollowers = [];
    let newFollowings = [];

    if (type === 'followers') {
      // 切換跟隨者
      newFollowers = followers.map(o => {
        if (o.id === followUser.id) {
          return { ...o, isFollowed: (o.isFollowed === 1 ? 0 : 1) }
        } else {
          return { ...o }
        }
      })

      if (followUser.isFollowed === 1) {
        id === currentUser.id ?
          newFollowings = followings.filter(o => o.id !== followUser.id) :
          newFollowings = followings.map(o => {
            if (o.id === followUser.id) {
              return {
                ...o,
                isFollowed: (o.isFollowed === 1 ? 0 : 1)
              }
            } return { ...o }
          })
        await removeFollowing(followUser.id)
        setFollowers(newFollowers)
        setFollowings(newFollowings)
        update()
      }
      if (followUser.isFollowed === 0) {
        Number(id) === currentUser.id ?
          newFollowings = [{ ...followUser }].concat(followings) :
          newFollowings = followings.map(o => {
            if (o.id === followUser.id) {
              return {
                ...o,
                isFollowed: (o.isFollowed === 1 ? 0 : 1)
              }
            } return { ...o }
          })
        await addFollowing(followUser.id)
        setFollowers(newFollowers)
        setFollowings(newFollowings)
        update()
      }
    }

    if (type === 'followings') {
      console.log('following')
      //  切換跟隨者
      newFollowers = followers.map(o => {
        if (o.id === followUser.id) {
          return {
            ...o,
            isFollowed: (o.isFollowed === 1 ? 0 : 1)
          }
        } return { ...o }
      })
      console.log('id', id, 'currentUser.id', currentUser.id, id === currentUser.id)
      Number(id) === currentUser.id ?
        newFollowings = followings.filter(o => o.id !== followUser.id) :
        newFollowings = followings.map(o => {
          if (o.id === followUser.id) {
            return {
              ...o,
              isFollowed: (o.isFollowed === 1 ? 0 : 1)
            }
          } return { ...o }
        })
      if (followUser.isFollowed === 1) {
        await removeFollowing(followUser.id)
      }
      if (followUser.isFollowed === 0) {
        await addFollowing(followUser.id)
      }

      console.log('newFollowers', newFollowers)
      console.log('newFollowings', newFollowings)
      setFollowers(newFollowers)
      setFollowings(newFollowings)
      update()
    }
  }


  // 沒有權限登出
  // useEffect(() => {
  //   if (!isAuthenticated || currentUser.role !== 'user') {
  //     navigate('/login')
  //     return
  //   }
  // }, [currentUser, isAuthenticated])

  // useEffect取得資料
  // 取得頁面User的資料
  useEffect(() => {
    if (id) {
      const getUserAsync = async () => {
        try {
          if (id && id !== currentUser?.id) {
            const res = await getUser(id)
            console.log('user =>', res.data)
            setUser({ ...res.data });
          } else {
            setUser({ ...currentUser });
          }
        } catch (error) {
          console.error(error)
        }
      }
      getUserAsync();
    }
  }, [id])

  // 取得_某追隨使用者的人
  useEffect(() => {
    if (id && isAuthenticated) {
      const getUserFollowersAsync = async () => {
        try {
          const dbFollower = await getUserFollowers(id) || [];
          console.log('dbFollower', dbFollower);
          const users = dbFollower.map(o => ({
            ...o.FollowerUser,
            createAt: o.createAt
          }));
          console.log('setFollowers', users)
          setFollowers(users);
        } catch (err) {
          console.log(err)
        }
      }
      getUserFollowersAsync();
    }
  }, [id, isAuthenticated, update]);

  // 取得_某使用者追隨中的人
  useEffect(() => {
    if (id && isAuthenticated) {
      console.log('使用者id', currentUser.id, '頁面id', id)
      console.log('是否是同一人', currentUser.id === id)
      const getUserFollowingsAsync = async () => {
        try {
          const dbFollowing = await getUserFollowings(id);
          console.log('dbFollowing', dbFollowing);
          const users = dbFollowing.map(o => ({
            ...o.FollowingUser,
            createAt: o.createAt
          }));
          console.log('setFollowings', users)
          setFollowings(users);
        } catch (err) {
          console.log(err)
        }
      }
      getUserFollowingsAsync();
    }
  }, [id, isAuthenticated, update]);



  return (
    <>
      <Header title={user?.name} subTitle={(user?.tweetCount || 0) + '推文'} type="user" url={"/userself/" + id} />
      <Tab
        titles={['跟隨者', '正在跟隨']}
        tabId={tabId}
        onChangeTab={handleChangeTab}
      />
      {followers && <FollowList
        show={tabId === 0}
        type='followers'
        follows={followers}
        onClick={handleClick}
        currentUserId={currentUser?.id}
      />}
      {followings &&
        <FollowList
          show={tabId === 1}
          type='followings'
          follows={followings}
          onClick={handleClick}
          currentUserId={currentUser?.id}
        />}

    </>
  )
}

export default FollowPage