export default function GameWrapper({ children }) {
  return (
    <div className="bg pl-[32px] py-[20px] game-shadow mt-[24px] overflow-hidden">
      {children}
    </div>
  );
}
