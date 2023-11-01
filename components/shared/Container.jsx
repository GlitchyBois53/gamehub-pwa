// This component is a container, that is used to wrap other components.
export default function Container({ children, noPagination, overflow }) {
  return (
    <div
      className={`relative bg game-shadow p-[18px] ${
        !overflow && "overflow-hidden"
      } ${
        !noPagination ? "pb-[52px]" : "pb-0"
      } min-h-container-mobile md:min-h-container h-full`}
    >
      {children}
    </div>
  );
}
