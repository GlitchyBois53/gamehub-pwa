export default function Container({ children }) {
  return (
    <div className="relative bg game-shadow p-[18px] pb-[52px] min-h-container-mobile md:min-h-container">
      {children}
    </div>
  );
}
