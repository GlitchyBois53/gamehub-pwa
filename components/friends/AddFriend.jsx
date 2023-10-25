import Modal from "../shared/Modal";

export default function AddFriend({ isAddFriendOpen, setIsAddFriendOpen }) {
  return (
    <Modal
      isModalOpen={isAddFriendOpen}
      setIsModalOpen={setIsAddFriendOpen}
      title={"Add Friend"}
    >
      <p>Hello</p>
    </Modal>
  );
}
