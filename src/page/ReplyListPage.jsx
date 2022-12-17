import ReplyList from '../components/tweet/ReplyList/ReplyList';
import Header from "../components/layoutItems/Header";

const ReplyListPage = () => {
  return (
    <>
      <Header title="推文" type="main" />
      <ReplyList />
    </>
  )
}

export default ReplyListPage