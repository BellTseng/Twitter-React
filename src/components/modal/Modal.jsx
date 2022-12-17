import style from '../../style/Modal.module.scss';
import { useState } from 'react';



const Modal = ({ isOpen, closeModal, reply }) => {
  console.log(!!isOpen ? 'hiii' : '');
  console.log('isOpen', isOpen);
  const [txt, setTxt] = useState('');

  const handleClickSave = () => {
    alert('已儲存資料:', txt);
    closeModal();
  }

  const handleChange = (value) => {
    setTxt(value);
  }

  const handleClickClose = (e) => {
    if (e.target.id === 'myModal') {
      closeModal();
    }
  }

  return (
    <div
      id="myModal"
      className={style.modal + ' ' + (!!isOpen ? style.show : '')}
      onClick={handleClickClose}
    >
      <div className={style.modalContent}>
        <button className={style.close} onClick={closeModal}></button>
        <div className={style.modalContentInner}>
          

          {/* <p>Some text in the Modal..</p>
          <input onChange={(e) => { handleChange?.(e.target.value) }} /> */}
        </div>
        <div className={style.btnBox}>
          <button className={style.btn} onClick={handleClickSave}> {!!reply ? '回覆' : '推文'} </button>
        </div>
      </div>
    </div >
  )
}

export default Modal