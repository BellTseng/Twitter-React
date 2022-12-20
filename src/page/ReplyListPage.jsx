import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "./../contexts/AuthContext";
import Header from "../components/layoutItems/Header";
import ReplyList from '../components/tweet/ReplyList/ReplyList';
import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import SingleTweet from '../components/tweet/SingleTweet/SingleTweet';
import SingleTweetForReply from '../components/tweet/SingleTweetForReply/SingleTweetForReply';
import Modal from '../components/modal/Modal';
import { getTweet, getReplies, createReply, addLike, removeLike } from './../api/tweet';
import { getUserLikes } from '../api/user';



const ReplyListPage = () => {
  // 取得文章id後撈：1.單一文章資料, 2.repplyList的資料
  let { id } = useParams();
  console.log('id', id);
  const navigate = useNavigate();
  const [tweet, setTweet] = useState(null);
  const [replys, setReplys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  // 回覆
  const handleCreateReply = async (value) => {
    setModalOpen(false);
    try {
      const result = await createReply({
        tweetId: tweet.id,
        UserId: currentUser.id,
        comment: value,
      });
      console.log('result', result)
      setReplys((prevPeplies) => {
        return [{
          ...result,
          createdAt: "幾秒前",
          User: { ...currentUser }
        }, ...prevPeplies]
      })
    } catch (err) {
      console.error(err);
    }
  }


  // 按讚
  const handleClickLike = async () => {
    // 新增Tweet這邊會在使用ChangeLikePOSTAPI
    try {
      setTweet({
        ...tweet,
        isLiked: !tweet.isLiked
      });
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
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    const getTweetAndRepliesAsync = async () => {
      try {
        const tweet = await getTweet(id);
        console.log('tweet', tweet);
        setTweet(tweet);
        const replies = await getReplies(id);
        console.log('replies', replies);
        setReplys(replies);
        const dbLikeList = await getUserLikes(currentUser.id);
        console.log('dbLikeList =>', dbLikeList)
        // if (dbLikeList.map(o => o.TweetId).includes(id)) {
        //   setTweet({ ...tweet, isLiked: true });
        // }
      } catch (err) {
        console.log(err)
      }
    }
    getTweetAndRepliesAsync();

  }, [id, tweet, navigate, currentUser, isAuthenticated]);

  return (
    <>
      <Header title="推文" type="tweet" />
      {/* <SingleTweet
        id={id}
        User={tweet?.User || ''}
        time={tweet?.time || ''}
        description={tweet?.description || ''}
        replyCount={tweet?.replyCount || ''}
        likeCount={tweet?.likeCount || ''}
        isLiked={tweet?.isLiked}
        onClickReply={setModalOpen(true)}
        onClickLike={handleClickLike}
      /> */}

      {/* <ReplyList replys={replys} /> */}

      <Modal isOpen={modalOpen} closeModal={handleCloseModal}>
        {/* {modalOpen &&
          <>
            <SingleTweetForReply
              id={tweet?.id || ''}
              User={tweet?.User || ''}
              time={tweet?.time || ''}
              description={tweet?.description || ''}
            />
            <TweetEdit
              name='回覆'
              placeholder='推你的回覆'
              onClick={handleCreateReply}
            />
          </>
        } */}
      </Modal>
    </>
  )
}

export default ReplyListPage