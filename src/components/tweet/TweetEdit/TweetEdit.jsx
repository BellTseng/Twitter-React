import { useRef } from 'react';
import style from './TweetEdit.module.scss';
const TweetEdit = ({ placeholder, onClange, onClick, name }) => {
  const textArea = useRef(null);

  return (
    <div className={style.tweet}>
      <div className={style.tweetBox}>
        <div className={style.avatar}>
          <img src={"https://loremflickr.com/320/240/logo/?lock=1"} alt="" />
        </div>
        <textarea
          className={style.textarea}
          placeholder={placeholder}
          ref={textArea}
        >
        </textarea>
      </div>
      <div className={style.btnBar}>
        <button
          className={style.btn}
          onClick={() => onClick?.(textArea.current.value)}>
          {name}
        </button>
      </div>
    </div>
  )
}

export default TweetEdit