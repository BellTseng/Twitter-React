import styles from './UserInfo.module.scss'

const UserInfo = ({ user }) => {
  return(
    <div className={styles.userInfo}>
      <img
        className={styles.background}
        src={user.background ? user.background : "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg"}
        alt="background"
      />

      <img
        className={styles.avatar}
        src={user.avatar ? user.avatar : "https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj"}
        alt="avatar"
      />

      <div className={styles.userTag}>
        <h5 className={styles.userName}>{user.userName ? user.userName : 'Jas'}</h5>
        <p className={styles.userAccount}>@{user.account ? user.account : 'ggg123456'}</p>
      </div>

      <div className={styles.userIntroduction}>
        <p>{user.introduction ? user.introduction : 'test! test! test!'}</p>
      </div>


      <div className={styles.userPopular}>
        <p className={styles.following}>{user.folloingCount ? user.folloingCount : '59'}個<span>跟隨中</span></p>
        <p className={styles.follower}>{user.followerCount ? user.followerCount : '230'}位<span>跟隨者</span></p>
      </div>

    </div>
  )
}

export default UserInfo