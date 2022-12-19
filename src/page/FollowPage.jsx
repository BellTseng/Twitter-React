import FollowList from "../components/tweet/FollowList/FollowList"
import Header from "../components/layoutItems/Header";
import { defaultFollows } from "../data/tweets.js";
import { useState } from "react";

const FollowPage = () => {
  const [follows, setFollows] = useState(defaultFollows)

  const handleClick = (id) => {
    if (follows.includes(id)) {
      setFollows(follows.filter(followId => followId !== id));
    } else {
      setFollows(follows.concat(id));
    }
  }

  return (
    <>
      <Header title="UserName" subTitle="25推文" type="main" />
      <FollowList follows={follows} onClick={handleClick} />
    </>
  )
}

export default FollowPage