import { acceptRequest, declineRequest } from "../../lib/actions/user.actions";
import InfoCard from "../shared/InfoCard";
import Modal from "../shared/Modal";
import SquareButton from "../shared/SquareButton";
import Vr from "../shared/Vr";
import FriendInfo from "./FriendInfo";
import { useServerAction } from "../../lib/useServerAction";

export default function Request({
  isRequestOpen,
  setIsRequestOpen,
  clerkId,
  requests,
  currentUser,
}) {
  return (
    <Modal
      isModalOpen={isRequestOpen}
      setIsModalOpen={setIsRequestOpen}
      title={"Friend Requests"}
    >
      {requests.map((request) => {
        const commonGamesArr = request?.library?.filter((game) =>
          currentUser?.library?.includes(game)
        );
        return (
          <Card
            request={request}
            commonGames={commonGamesArr.length}
            clerkId={clerkId}
          />
        );
      })}
    </Modal>
  );
}

function Card({ request, commonGames, clerkId }) {
  const [runAcceptAction, isAcceptingRunning] = useServerAction(acceptRequest);
  const [runDeclineAction, isDecliningRunning] =
    useServerAction(declineRequest);

  async function acceptFriendRequest() {
    await runAcceptAction({
      clerkId: clerkId,
      targetId: request?.clerkId,
    });
  }

  async function declineFriendRequest() {
    await runDeclineAction({
      clerkId: clerkId,
      targetId: request?.clerkId,
    });
  }

  return (
    <article
      className="px-[24px] py-[20px] bg game-shadow rounded-[2px] h-full max-h-[98px] flex justify-between items-center"
      key={request?.clerkId}
    >
      <FriendInfo
        email={request?.email}
        id={request.clerkId}
        image={request?.image}
        username={request?.username}
      />
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
            number={request?.library?.length}
            title={"Total"}
            icon={"/library-icon.svg"}
            darkIcon={"/library-icon-dark.svg"}
          />
        </div>
        <SquareButton
          handleClick={acceptFriendRequest}
          variant={"check"}
          isLoading={isAcceptingRunning}
        />
        <SquareButton
          handleClick={declineFriendRequest}
          variant={"delete"}
          isLoading={isDecliningRunning}
        />
      </div>
    </article>
  );
}
