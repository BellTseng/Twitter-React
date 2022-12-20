import { useRef } from 'react';
import style from './TweetEdit.module.scss';


const TweetEdit = ({ placeholder, onClick, name }) => {
  const textArea = useRef(null);

  const handleClick = () => {
    console.log('click');
    const value = textArea.current.value.trim();
    console.log('value', value);
    if (value.length > 140) {
      alert('內容不得大於140字');
      return;
    } else if (!!value.length) {
      onClick?.(textArea.current.value);
    } else {
      alert('內容不得為空白');
      return;
    }

  }

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
          onClick={handleClick}>
          {name}
        </button>
      </div>
    </div>
  )
}

export default TweetEdit