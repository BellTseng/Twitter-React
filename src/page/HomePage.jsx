import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import Header from "../components/layoutItems/Header";
import { defaultTweetList, tweet } from './../data/tweets.js'
import { useState } from 'react';
import Swal from 'sweetalert2';


const HomePage = () => {
  const [tweets, setTweets] = useState(defaultTweetList);

  const handleCreateTweet = (value) => {
    console.log('tweet:', value);
    Swal.fire({
      position: 'top',
      title: '新增推文成功！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });

    // 新增Tweet這邊會在使用API
    setTweets([{
      "id": tweets.length++,
      "description": value,
      "UserId": 2,
      "createdAt": "2022-12-13T13:14:22.000Z",
      "updatedAt": "2022-12-13T13:14:22.000Z",
      "replyCount": 3,
      "likeCount": 0,
      "User": {
        "id": 2,
        "account": "user1",
        "name": "user1",
        "avatar": "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
      },
      "isLiked": false
    }].concat([...tweets]).filter(tweet => !!tweet));
  }

  console.log('tweets:', tweets);


  return (
    <>
      <Header title="首頁" type="main" />
      <TweetEdit key={tweets.length}
        placeholder="有什麼新鮮事？"
        onClick={handleCreateTweet}
      />
      <TweetList tweets={tweets} />
    </>
  )
}

export default HomePage