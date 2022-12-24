import { useRef, useState } from 'react';
import style from './TweetEdit.module.scss';
import { useAuth } from './../../../contexts/AuthContext';


const TweetEdit = ({ placeholder, onClick, name, home }) => {
  const textArea = useRef(null);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleClick = () => {
    console.log('click');
    const value = textArea.current.value.trim();
    console.log('value', value);
    if (value.length > 140) {
      setError('內容不得大於140字');
      setTimeout(() => {
        setError('');
      }, 5000)
      return;
    } else if (!!value.length) {
      onClick?.(textArea.current.value);
    } else {
      setError('內容不得為空白');
      setTimeout(() => {
        setError('');
      }, 5000)
      return;
    }

  }

  return (
    <>
      <div className={style.tweet}>
        <div className={style.tweetBox}>
          <div className={style.avatar}>
            <img src={currentUser?.avatar} alt="" />
          </div>
          <textarea
            className={style.textarea + ' ' + (!!home ? style.home : '')}
            placeholder={placeholder}
            ref={textArea}
          >
          </textarea>
        </div>
        <div className={style.btnBar}>
          <span className={style.error}>{error}</span>
          <button
            className={style.btn}
            onClick={handleClick}>
            {name}
          </button>
        </div>
      </div>
      {!!home && <div className={style.grayLine}></div>}
    </>
  )
}

export default TweetEdit