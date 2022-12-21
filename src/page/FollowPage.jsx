import FollowList from "../components/tweet/FollowList/FollowList"
import Header from "../components/layoutItems/Header";
import Tab from "../components/layoutItems/Tab"
import { defaultFollows } from "../data/tweets.js";
import { useState } from "react";

const FollowPage = () => {
  const [follows, setFollows] = useState(defaultFollows)
  const [tabId, setUserTabId] = useState(1)

  const handleChangeTab = (value) => {
    console.log('value', value)
    setUserTabId(value)
  }

  const handleClick = (id) => {
    if (follows.includes(id)) {
      setFollows(follows.filter(followId => followId !== id));
    } else {
      setFollows(follows.concat(id));
    }
  }

  return (
    <>
      <Header title="UserName" subTitle="25推文" type="user" url="" />
      <Tab
        titles={['跟隨者', '正在跟隨']}
        tabId={tabId}
        onChangeTab={handleChangeTab}
      />
      <FollowList follows={follows} onClick={handleClick} />
    </>
  )
}

export default FollowPage