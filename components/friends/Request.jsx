import Modal from "../shared/Modal";

export default function Request({ isRequestOpen, setIsRequestOpen }) {
  return (
    <Modal
      isModalOpen={isRequestOpen}
      setIsModalOpen={setIsRequestOpen}
      title={"Friend Requests"}
    >
      <p>Hello</p>
    </Modal>
  );
}
