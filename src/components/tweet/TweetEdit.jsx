
const TweetEdit = ({ placeholder }) => {
  return (
    <div className="tweet">
      <div className="tweetAvatar">
        <img src={"https://loremflickr.com/320/240/logo/?lock=1"} alt="" />
      </div>
      <textarea rows="4" cols="50" placeholder={placeholder}>

      </textarea>
    </div>
  )
}

export default TweetEdit