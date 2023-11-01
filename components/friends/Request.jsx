import { acceptRequest, declineRequest } from "../../lib/actions/user.actions";
import InfoCard from "../shared/InfoCard";
import Modal from "../shared/Modal";
import SquareButton from "../shared/SquareButton";
import Vr from "../shared/Vr";
import FriendInfo from "./FriendInfo";
import { useServerAction } from "../../lib/useServerAction";
import { useCallback, useEffect, useRef, useState } from "react";

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
      <div className="flex flex-col gap-[12px] h-full md:h-[420px] max-h-modal-mobile-large overflow-y-scroll p-[12px]">
        {requests.length !== 0 ? (
          <>
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
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center flex-col gap-[12px]">
            <span className="text-[32px]">🤔</span>
            <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold">
              You currently don't have any requests
            </p>
          </div>
        )}
      </div>
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

  const ref = useRef();
  // Create a state variable to store the maximum width of the container and the window width
  const [windowWidth, setWindowWidth] = useState(0);

  // Define a function to debounce the resize event listener
  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  // Define a function to handle the resize event
  const handleResize = useCallback(
    debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Remove the resize event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Set the initial maximum width of the container
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const add = windowWidth > 768 ? 0 : ref?.current?.clientHeight;

  return (
    <article
      style={{ maxHeight: `${98 + add}px` }}
      className="px-[24px] py-[20px] bg game-shadow rounded-[2px] h-full md:max-h-[98px] flex flex-col md:flex-row gap-[12px] justify-between items-center"
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
        <div
          className="flex gap-[12px] flex-wrap md:flex-nowrap justify-center"
          ref={ref}
        >
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
      </div>
    </article>
  );
}
