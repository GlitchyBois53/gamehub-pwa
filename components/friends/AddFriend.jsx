import { useState } from "react";
import Modal from "../shared/Modal";
import FriendSearch from "./FriendSearch";
import FriendInfo from "./FriendInfo";
import InfoCard from "../shared/InfoCard";
import Vr from "../shared/Vr";
import SquareButton from "../shared/SquareButton";
import {
  acceptRequest,
  handleFriendRequest,
  removeFriend,
} from "../../lib/actions/user.actions";
import { useServerAction } from "../../lib/useServerAction";

export default function AddFriend({
  isAddFriendOpen,
  setIsAddFriendOpen,
  users,
  clerkId,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const gunkUser = users.find((user) => user?.clerkId === clerkId);

  function handleSubmit(e) {
    e.preventDefault();

    const gunkFreeUsers = users.filter((user) => user?.clerkId !== clerkId);

    setSearchResults(
      gunkFreeUsers.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setIsSubmitted(true);
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
    setIsSubmitted(false);
  }

  return (
    <Modal
      isModalOpen={isAddFriendOpen}
      setIsModalOpen={setIsAddFriendOpen}
      title={"Add Friend"}
    >
      <FriendSearch
        isLongBoi={true}
        placeholder={"Search for a username"}
        searchValue={searchValue}
        handleSubmit={handleSubmit}
        setSearchValue={setSearchValue}
        handleChange={handleChange}
      />
      <div className="flex flex-col gap-[12px] pt-[24px] h-full md:h-[380px] max-h-modal-mobile md:max-h-none overflow-y-scroll p-[12px]">
        {searchResults.length !== 0 || searchValue === "" ? (
          <>
            {searchResults.map((user) => {
              const commonGamesArr = user?.library?.filter((game) =>
                gunkUser?.library?.includes(game)
              );

              return (
                <Card
                  friend={user}
                  currentUser={gunkUser}
                  key={user?.clerkId}
                  commonGames={commonGamesArr.length}
                />
              );
            })}
          </>
        ) : (
          isSubmitted && (
            <div className="h-full w-full flex items-center justify-center flex-col gap-[12px]">
              <span className="text-[32px]">🤐</span>
              <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold">
                <span className="font-bold">"{searchValue}" </span>
                doesn't exist
              </p>
            </div>
          )
        )}
      </div>
    </Modal>
  );
}

function Card({ friend, commonGames, currentUser }) {
  const [runRequestAction, isRequestingRunning] =
    useServerAction(handleFriendRequest);
  const [runAcceptAction, isAcceptingRunning] = useServerAction(acceptRequest);
  const [runRemoveAction, isRemovingRunning] = useServerAction(removeFriend);

  async function sendFriendRequest() {
    await runRequestAction({
      clerkId: currentUser?.clerkId,
      targetId: friend?.clerkId,
    });
  }

  async function acceptFriendRequest() {
    await runAcceptAction({
      clerkId: currentUser?.clerkId,
      targetId: friend?.clerkId,
    });
  }

  async function handleRemoveFriend() {
    await runRemoveAction({
      clerkId: currentUser?.clerkId,
      targetId: friend?.clerkId,
    });
  }

  let status = "none";

  if (currentUser?.friends?.includes(friend?.clerkId)) {
    status = "friend";
  } else if (currentUser?.sentRequests?.includes(friend?.clerkId)) {
    status = "requested";
  } else if (currentUser?.receivedRequests?.includes(friend?.clerkId)) {
    status = "pending";
  }

  return (
    <article className="bg game-shadow px-[24px] py-[20px] flex justify-between items-center max-h-[133px] h-full md:max-h-[98px] flex-col md:flex-row gap-[12px]">
      <div className="h-full w-full">
        <FriendInfo
          email={friend?.email}
          id={friend?.clerkId}
          image={friend?.image}
          username={friend?.username}
        />
      </div>
      <div className="flex gap-[18px] items-center h-full">
        <div className="hidden md:flex gap-[8px] h-full">
          <InfoCard
            number={commonGames}
            title={"Common"}
            icon={"/games-icon.png"}
            darkIcon={"/games-icon-dark.png"}
          />
          <Vr />
          <InfoCard
            number={friend?.library?.length}
            title={"Total"}
            icon={"/library-icon.svg"}
            darkIcon={"/library-icon-dark.svg"}
          />
        </div>
        {status === "none" ? (
          <SquareButton
            handleClick={sendFriendRequest}
            isLoading={isRequestingRunning}
          />
        ) : status === "pending" ? (
          <SquareButton
            handleClick={acceptFriendRequest}
            variant={"check"}
            isLoading={isAcceptingRunning}
          />
        ) : status === "friend" ? (
          <SquareButton
            handleClick={handleRemoveFriend}
            variant={"delete"}
            isLoading={isRemovingRunning}
          />
        ) : status === "requested" ? (
          <SquareButton
            handleClick={sendFriendRequest}
            isDisabled={true}
            isLoading={isRequestingRunning}
          />
        ) : null}
      </div>
    </article>
  );
}
