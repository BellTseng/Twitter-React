import TweetEdit from "../tweet/TweetEdit/TweetEdit"
import Modal from "./Modal"


const TweetModal = ({ isOpen, closeModal, reply }) => {

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      reply={reply} >
      {/* <TweetEdit /> */}
    </Modal >
  )
}

export default TweetModal