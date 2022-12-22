import FollowList from "../components/tweet/FollowList/FollowList"
import Header from "../components/layoutItems/Header";
import Tab from "../components/layoutItems/Tab"
import { defaultFollows } from "../data/tweets.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFollowers, getUserFollowings, addFollowing, removeFollowing } from '../api/followship';
import { useAuth } from "../contexts/AuthContext";
import { getUser } from "./../api/user";

const FollowPage = () => {
  let { id } = useParams();
  console.log('id', id);
  const { currentUser, update, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [tabId, setUserTabId] = useState(0)
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
          return { ...o, isFollowed: !o.isFollowed }
        } else {
          return { o }
        }
      })

      // 判斷被跟隨者(使用者本人)
      if (followings.map(o => o.id).includes(followUser.id)) {
        id === currentUser.id ?
          newFollowings = followings.filter(o => o.id !== followUser.id) :
          newFollowings = followings.map(o => o.id === followUser.id ? { ...o, isFollowed: !o.isFollowed } : o)
        await removeFollowing(followUser.id, currentUser.id)
        console.log('newFollowers', newFollowers)
        console.log('newFollowings', newFollowings)
        setFollowers(newFollowers)
        setFollowings(newFollowings)
      } else {
        console.log('id', id, 'currentUser.id', currentUser.id)
        Number(id) === currentUser.id ?
          newFollowings = [{ ...followUser }].concat(followings) :
          newFollowings = followings.map(o => o.id === followUser.id ? { ...o, isFollowed: !o.isFollowed } : o)
        await addFollowing(followUser.id)
        console.log('newFollowers', newFollowers)
        console.log('newFollowings', newFollowings)
        setFollowers(newFollowers)
        setFollowings(newFollowings)
        update()
      }
    }

    if (type === 'followings') {
      console.log('following')
      //  切換跟隨者
      newFollowers = followers.map(o => o.id === followUser.id ? { ...o, isFollowed: !o.isFollowed } : o)
      console.log('id', id, 'currentUser.id', currentUser.id, id === currentUser.id)
      Number(id) === currentUser.id ?
        newFollowings = followings.filter(o => o.id !== followUser.id) :
        newFollowings = followings.map(o => o.id === followUser.id ? { ...o, isFollowed: !o.isFollowed } : o)
      await removeFollowing(followUser.id, currentUser.id)
      console.log('newFollowers', newFollowers)
      console.log('newFollowings', newFollowings)
      setFollowers(newFollowers)
      setFollowings(newFollowings)
      update()
    }
  }




  // useEffect取得資料
  // 取得頁面User的資料
  useEffect(() => {
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
  }, [id, isAuthenticated])

  // 取得_某追隨使用者的人
  useEffect(() => {
    if (id) {
      const getUserFollowersAsync = async () => {
        try {
          const dbFollower = await getUserFollowers(id) || [];
          console.log('dbFollower', dbFollower);
          const users = dbFollower.map(o => ({
            ...o.FollowerUser,
            isFollowed: o.isFollowed,
            createAt: o.createAt
          }));
          setFollowers(users);
        } catch (err) {
          console.log(err)
        }
      }
      getUserFollowersAsync();
    }
  }, [id, update]);

  // 取得_某使用者追隨中的人
  useEffect(() => {
    if (isAuthenticated) {
      console.log('使用者id', currentUser.id, '頁面id', id)
      console.log('是否是同一人', currentUser.id === id)
      const getUserFollowingsAsync = async () => {
        try {
          const dbFollowing = await getUserFollowings(id);
          console.log('dbFollowing', dbFollowing);
          const users = dbFollowing.map(o => ({
            ...o.FollowingUser,
            isFollowed: true,
            createAt: o.createAt
          }));
          setFollowings(users);
        } catch (err) {
          console.log(err)
        }
      }
      getUserFollowingsAsync();
    }
  }, [isAuthenticated, update]);



  return (
    <>
      <Header title={user?.name} subTitle={(user?.tweetCount || 0) + '推文'} type="user" url={"/userself/" + id} />
      <Tab
        titles={['跟隨者', '正在跟隨']}
        tabId={tabId}
        onChangeTab={handleChangeTab}
      />
      <FollowList
        show={tabId === 0}
        type='followers'
        follows={followers}
        onClick={handleClick}
        currentUserId={currentUser?.id}
      />
      <FollowList
        show={tabId === 1}
        type='followings'
        follows={followings}
        onClick={handleClick}
        currentUserId={currentUser?.id}
      />

    </>
  )
}

export default FollowPage