import SideBar from "../components/sidebar/SideBar";
import PopularUser from "../components/popular/PopularUser";
import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import Header from "../components/layoutItems/Header";


const HomePage = () => {
  return (
    <>
      <Header title="首頁" type="main" />
      <TweetEdit placeholder="有什麼新鮮事？" />
      <TweetList />
    </>
  )
}

export default HomePage