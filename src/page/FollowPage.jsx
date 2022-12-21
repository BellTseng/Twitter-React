import FollowList from "../components/tweet/FollowList/FollowList"
import Header from "../components/layoutItems/Header";
import Tab from "../components/layoutItems/Tab"
import { defaultFollows } from "../data/tweets.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getUserFollowers, getUserFollowings, addFollowing, removeFollowing } from '../api/followship';
import { useAuth } from "../contexts/AuthContext";

const FollowPage = () => {
  let { id } = useParams();
  console.log('id', id);
  const { currentUser, update, isAuthenticated } = useAuth();
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [tabId, setUserTabId] = useState(0)

  // 切換tab
  // 依index顯示不同的資料
  const handleChangeTab = (value) => {
    console.log('value', value)
    setUserTabId(value)
  }

  // 切換跟隨者的人狀態
  const handleClick = async (user, type) => {
    // 1.切換跟隨者狀態
    // 2.也同時要從被跟隨者列表移除/加入
    // 3. 進行update，因為有可能影響到popular

    let newFollowers = [];
    let newFollowings = [];

    if (type === 'followers') {
      // 切換跟隨者
      newFollowers = followers.map(o => {
        if (o.id === user.id) {
          return { ...o, isFollowed: !o.isFollowed }
        } else {
          return { o }
        }
      })

      // 判斷配跟隨者
      if (followings.map(o => o.id).includes(user.id)) {
        newFollowings = followings.filter(o => o.id !== user.id)
        await removeFollowing(user.id, currentUser.id)
      } else {
        newFollowings = [{ ...user }].concat(followings);
        await addFollowing(user.id)
      }
    }

    if (type === 'following') {
      newFollowings = followings.filter(o => o.id !== user.id)
      newFollowers = followers.map(o => o.id === user.id ? { ...o, isFollowed: !o.isFollowed } : o)
      await removeFollowing(user.id, currentUser.id)
    }
    setFollowers(newFollowers)
    setFollowings(newFollowings)
  }

  // useEffect取得資料
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
  }, [id]);

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
  }, [isAuthenticated]);



  return (
    <>
      <Header title="UserName" subTitle="25推文" type="user" url="" />
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
        disabled={currentUser?.id !== id}
      />
      <FollowList
        show={tabId === 1}
        type='followings'
        follows={followings}
        onClick={handleClick}
        disbled={currentUser?.id !== id}
      />

    </>
  )
}

export default FollowPage