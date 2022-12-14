import SideBar from "../components/sidebar/SideBar";
import PopularUser from "../components/popular/PopularUser";
import TweetEdit from '../components/tweet/TweetEdit';
import TweetList from '../components/tweet/TweetList/TweetList';
import layout from '../style/Layout.module.scss';



const HomePage = () => {

  return (
    <div className="webLayout">
      <SideBar />
      <main>
        <div className={layout.header}>首頁</div>
        <TweetEdit />
        <TweetList />
      </main>
      <PopularUser />
    </div>
  )
}

export default HomePage