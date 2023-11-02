// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

// this component is used to wrap the gamecontainer on the game page
export default function GameWrapper({ children }) {
  return (
    <div className="bg p-[32px] pb-[20px] game-shadow mt-[24px] overflow-hidden">
      {children}
    </div>
  );
}
