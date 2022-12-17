import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import Header from "../components/layoutItems/Header";
import { defaultTweetList } from './../data/tweets.js'
import { useState } from 'react';


const HomePage = () => {
  const [tweets, setTweets] = useState(defaultTweetList);
  return (
    <>
      <Header title="首頁" type="main" />
      <TweetEdit placeholder="有什麼新鮮事？" />
      <TweetList tweets={tweets} />
    </>
  )
}

export default HomePage