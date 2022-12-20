import ReplyList from '../components/tweet/ReplyList/ReplyList';
import Header from "../components/layoutItems/Header";
import SingleTweet from '../components/tweet/SingleTweet/SingleTweet';
import { defaultTweet, defaultReplys } from '../data/tweets';

import { useParams } from 'react-router-dom';
import { useState } from 'react';


const ReplyListPage = () => {
  // 取得文章id後撈：1.單一文章資料, 2.repplyList的資料
  let { id } = useParams();
  console.log('id', id);
  const tweet = { ...defaultTweet };
  const [replys, setReplys] = useState(defaultReplys);

  return (
    <>
      <Header title="推文" type="tweet" />
      <SingleTweet
        id={id}
        User={tweet.User}
        time={tweet.time}
        description={tweet.description}
        replyCount={tweet.replyCount}
        likeCount={tweet.likeCount}
        isLiked={tweet.isLiked}
      />

      <ReplyList replys={replys} />
    </>
  )
}

export default ReplyListPage