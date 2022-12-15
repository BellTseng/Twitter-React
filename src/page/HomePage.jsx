import SideBar from "../components/sidebar/SideBar";
import PopularUser from "../components/popular/PopularUser";
import TweetEdit from '../components/tweet/TweetEdit/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import Main from "../components/laylout/Main";
import Header from "../components/laylout/Header";


const HomePage = () => {
  return (
    <>
      <SideBar />
      <Main>
        <Header title="首頁" type="main" />
        <TweetEdit placeholder="有什麼新鮮事？" />
        <TweetList />
        <PopularUser />
      </Main>
    </>
  )
}

export default HomePage