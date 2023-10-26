import { useState } from "react";
import Modal from "../shared/Modal";
import FriendSearch from "./FriendSearch";
import FriendInfo from "./FriendInfo";
import InfoCard from "../shared/InfoCard";
import Vr from "../shared/Vr";

export default function AddFriend({
  isAddFriendOpen,
  setIsAddFriendOpen,
  users,
  clerkId,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const gunkUser = users.find((user) => user?.clerkId === clerkId);

  function handleSubmit(e) {
    e.preventDefault();

    const gunkFreeUsers = users.filter((user) => user?.clerkId !== clerkId);

    setSearchResults(
      gunkFreeUsers.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
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
      />
      <div className="flex flex-col gap-[12px] pt-[24px] h-[380px] overflow-x-scroll p-[12px]">
        {searchResults.map((user) => {
          const commonGamesArr = user?.library?.filter((game) =>
            gunkUser?.library.includes(game)
          );

          console.log(commonGamesArr);
          return <Card user={user} key={user?.id} gunkUser={gunkUser} />;
        })}
      </div>
    </Modal>
  );
}

function Card({ user, gunkUser }) {
  const commonGamesArr = user?.library?.filter((game) =>
    gunkUser?.library?.includes(game)
  );

  return (
    <article className="bg game-shadow px-[24px] py-[20px] flex justify-between items-center h-full max-h-[98px]">
      <div className="h-full">
        <FriendInfo
          email={user?.email}
          id={user?.clerkId}
          image={user?.image}
          username={user?.username}
        />
      </div>
      <div className="flex gap-[8px] h-full">
        <InfoCard
          number={commonGamesArr?.length}
          title={"Common"}
          icon={"/games-icon.png"}
          darkIcon={"/games-icon-dark.png"}
        />
        <Vr />
        <InfoCard
          number={user?.library?.length}
          title={"Total"}
          icon={"/library-icon.svg"}
          darkIcon={"/library-icon-dark.svg"}
        />
      </div>
    </article>
  );
}
