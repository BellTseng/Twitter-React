import style from './TweetEdit.module.scss';
const TweetEdit = ({ placeholder }) => {
  const handleClick = () => {
    console.log('推文');
  }

  return (
    <div className={style.tweet}>
      <div className={style.tweetBox}>
        <div className={style.avatar}>
          <img src={"https://loremflickr.com/320/240/logo/?lock=1"} alt="" />
        </div>
        <textarea className={style.textarea} placeholder={placeholder}>
        </textarea>
      </div>
      <div className={style.btnBar}>
        <button
          className={style.btn}
          onClick={handleClick}>
          推文
        </button>
      </div>
    </div>
  )
}

export default TweetEdit