export default function Container({ children, noPagination }) {
  return (
    <div
      className={`relative bg game-shadow p-[18px] overflow-hidden ${
        !noPagination ? "pb-[52px]" : "pb-0"
      } min-h-container-mobile md:min-h-container`}
    >
      {children}
    </div>
  );
}
