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
  const { currentUser, update } = useAuth();
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [tabId, setUserTabId] = useState(1)

  // 切換tab
  // 依index顯示不同的資料
  const handleChangeTab = (value) => {
    console.log('value', value)
    setUserTabId(value)
  }

  // 切換跟隨者的人狀態
  const handleFollowerClick = async (item, isFollowed = true) => {
    console.log(item.followerId, item.followingId, isFollowed)
    // 1.切換跟隨者狀態
    // 2.也同時要從被跟隨者列表移除/加入
    // 3. 進行update，因為有可能影響到popular

    let newFollowers = [];
    let newFollowings = [];

    newFollowers = followers.map(o => {
      if (o.followerId === item.followerId) {
        return { ...o, isFollowed: !isFollowed }
      }
    })

    try {
      // 取消跟隨
      if (isFollowed) {
        newFollowings = followings.filter(o => o.followingId === item.followerId);
        await removeFollowing(item.followerId, currentUser.id)
      }

      // 新增跟隨
      if (!isFollowed) {
        newFollowings = [{
          "followerId": currentUser.id,
          "followingId": item.followerId,
          "createdAt": "幾秒鐘前",
          "FollowingUser": { ...item.FollowerUser },
          "isFollowed": true
        }].concat(followings)
        await addFollowing(item.followerId)
      }
      setFollowers(newFollowers)
      setFollowings(newFollowings)

    } catch (error) {
      console.error('error', error)
    }

  }

  // 切換被跟隨者的狀態
  const handleFollowingClick = async (item, isFollowed = true) => {
    console.log(item.followerId, item.followingId, isFollowed)
    // 取消跟隨
    // 1. 移出被跟隨者陣列
    // 2. 判斷如果有再跟隨者列表中的話，要切換狀態
    // 3. 進行update，因為有可能影響到popular

    try {

      let newFollowers = [];
      let newFollowings = [];

      newFollowers = followers.map(o => {
        if (o.followerId === item.followingId) {
          return { ...o, isFollowed: !isFollowed }
        }
      })

      newFollowings = followings.filter(o => o.followingId === item.followingId);
      await removeFollowing(item.followerId, currentUser.id)

      setFollowers(newFollowers)
      setFollowings(newFollowings)

    } catch (error) {
      console.log(error)
    }


  }


  // useEffect取得資料
  // 取得_某追隨使用者的人
  useEffect(() => {
    const getUserFollowersAsync = async () => {
      try {
        const dbTweet = await getUserFollowers(id);
        console.log('dbTweet', dbTweet);
        setFollowers({ ...dbTweet });
      } catch (err) {
        console.log(err)
      }
    }
    getUserFollowersAsync();
  }, []);

  // 取得_某使用者追隨中的人
  useEffect(() => {
    const getUserFollowingsAsync = async () => {
      try {
        const dbTweet = await getUserFollowings(id);
        console.log('dbTweet', dbTweet);
        setFollowings({ ...dbTweet });
      } catch (err) {
        console.log(err)
      }
    }
    getUserFollowingsAsync();
  }, []);



  return (
    <>
      <Header title="UserName" subTitle="25推文" type="user" url="" />
      <Tab
        titles={['跟隨者', '正在跟隨']}
        tabId={tabId}
        onChangeTab={handleChangeTab}
      />
      <FollowList
        show={tabId === 1}
        follows={followers}
        onClick={handleFollowerClick}
        disbled={id !== currentUser.id}
      />
      <FollowList
        show={tabId === 1}
        follows={followings}
        onClick={handleFollowingClick}
        disbled={id !== currentUser.id}
      />

    </>
  )
}

export default FollowPage