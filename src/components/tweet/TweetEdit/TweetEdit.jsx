import { useRef } from 'react';
import style from './TweetEdit.module.scss';
import { Toast } from '../../../utils/utils';


const TweetEdit = ({ placeholder, onClick, name, home }) => {
  const textArea = useRef(null);

  const handleClick = () => {
    console.log('click');
    const value = textArea.current.value.trim();
    console.log('value', value);
    if (value.length > 140) {
      Toast.fire({
        title: '內容不得大於140字',
        icon: 'error'
      })
      return;
    } else if (!!value.length) {
      onClick?.(textArea.current.value);
    } else {
      Toast.fire({
        title: '內容不得為空白',
        icon: 'error'
      })
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
          className={style.textarea + ' ' + (!!home ? style.home : '')}
          placeholder={placeholder}
          ref={textArea}
          if
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