import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import SingleTweetForReply from '../components/tweet/SingleTweetForReply/SingleTweetForReply';
import Header from "../components/layoutItems/Header";
import { defaultTweetList, tweet } from './../data/tweets.js'
import { useState } from 'react';
import Swal from 'sweetalert2';
import Modal from '../components/modal/Modal';


const HomePage = () => {
  const [tweet, setTweet] = useState(null)
  const [tweets, setTweets] = useState(defaultTweetList);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  }

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

  const handleCreateReply = (value) => {
    setModalOpen(false);
    console.log('reply:', value);
    Swal.fire({
      position: 'top',
      title: '新增回覆成功！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });
  }

  const handleOpenReply = (replyTweet) => {
    setTweet({ ...replyTweet });
    setModalOpen(true);
    // 打開Modale
    console.log('reply:', replyTweet);
    // Swal.fire({
    //   position: 'top',
    //   title: '新增回覆成功！',
    //   timer: 1000,
    //   icon: 'success',
    //   showConfirmButton: false,
    // });

    // // 新增Tweet這邊會在使用ReplyAPI
    // setTweets([{
    //   "id": tweets.length++,
    //   "description": value,
    //   "UserId": 2,
    //   "createdAt": "2022-12-13T13:14:22.000Z",
    //   "updatedAt": "2022-12-13T13:14:22.000Z",
    //   "replyCount": 3 + 1,
    //   "likeCount": 0,
    //   "User": {
    //     "id": 2,
    //     "account": "user1",
    //     "name": "user1",
    //     "avatar": "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
    //   },
    //   "isLiked": false
    // }].concat([...tweets]).filter(tweet => !!tweet));
  }

  const handleClickLike = (chosedTweet) => {
    console.log('tweet:', chosedTweet);
    const tweet = { ...chosedTweet }

    // 新增Tweet這邊會在使用ChangeLikePOSTAPI
    setTweets(tweets.map(t => {
      if (t.id === tweet.id) {
        return {
          ...tweet,
          isLiked: !tweet.isLiked,
          likeCount: tweet.likeCount + (!!tweet.isLiked ? -1 : 1)
        }
      }
      return t;
    }));
  }


  return (
    <>
      <Header title="首頁" type="main" />
      <TweetEdit key={tweets.length}
        name='推文'
        placeholder='有什麼新鮮事？'
        onClick={handleCreateTweet}
      />
      <TweetList
        tweets={tweets}
        onClickReply={handleOpenReply}
        onClickLike={handleClickLike}
      />

      <Modal isOpen={modalOpen} closeModal={handleCloseModal}>
        {modalOpen &&
          <>
            <SingleTweetForReply
              id={tweet.id}
              User={tweet.User}
              time={tweet.time}
              description={tweet.description}
            />
            <TweetEdit
              name='回覆'
              placeholder='推你的回覆'
              onClick={handleCreateReply}
            />
          </>
        }
      </Modal>
    </>
  )
}

export default HomePage