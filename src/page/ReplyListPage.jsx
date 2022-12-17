import TweetList from '../components/tweet/TweetList/TweetList';
import Header from "../components/layoutItems/Header";

const ReplyListPage = () => {
  return(
    <>
      <Header title="推文" type="main" />
      <TweetList />
    </>
  )
}

export default ReplyListPage