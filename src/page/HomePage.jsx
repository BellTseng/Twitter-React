import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import SingleTweetForReply from '../components/tweet/SingleTweetForReply/SingleTweetForReply';
import Header from "../components/layoutItems/Header";
import Modal from '../components/modal/Modal';
import { getTweets, createTweet, createReply, addLike, removeLike } from '../api/tweet';
import { getUserLikes } from './../api/user';
import Swal from 'sweetalert2';



const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, update, isLoading } = useAuth();
  const [tweet, setTweet] = useState(null)
  const [tweets, setTweets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleCreateTweet = async (value) => {
    // 頁面資料處理
    try {
      const result = await createTweet({
        UserId: currentUser.id,
        description: value,
      });
      setTweets((prevTweets) => {
        return [{
          ...result,
          createdAt: "幾秒前",
          likeCount: 0,
          replyCount: 0,
          isLiked: false,
          User: { ...currentUser }
        }, ...prevTweets]
      })
    } catch (err) {
      console.error(err);
    }
  }

  const handleCreateReply = async (value) => {
    setModalOpen(false);
    try {
      const result = await createReply({
        tweetId: tweet.id,
        UserId: currentUser.id,
        comment: value,
      });
      setTweets(tweets.map(t => {
        if (t.id === tweet.id) {
          return {
            ...tweet,
            replyCount: tweet.replyCount + 1
          }
        }
        return t;
      }));
    } catch (err) {
      console.error(err);
    }
  }

  const handleOpenReply = (chosedTweet) => {
    setTweet({ ...chosedTweet });
    setModalOpen(true);
  }

  const handleClickLike = async (chosedTweet) => {
    console.log('tweet:', chosedTweet);
    const tweet = { ...chosedTweet }
    // 新增Tweet這邊會在使用ChangeLikePOSTAPI
    try {
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
      // 按讚
      if (!tweet.isLiked) {
        await addLike(tweet.id);
      }
      // 取消讚
      if (!!tweet.isLiked) {
        await removeLike(tweet.id);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if ((!isAuthenticated || currentUser.role !== 'user') && !isLoading) {
      navigate('/login')
      return
    }
  }, [currentUser, isAuthenticated])


  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets()
        console.log('tweets', tweets)
        setTweets(tweets);
      } catch (err) {
        console.log(err)
      }
    }
    getTweetsAsync();
  }, [update]);


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