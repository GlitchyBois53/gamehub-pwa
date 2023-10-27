import Button from "./Button";

export default function Error({ error, reset }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-[100svh]">
      <section className="flex flex-col gap-[10px] items-center md:ml-[100px] p-[24px] text-center">
        <h1 className="text-[48px]">😮</h1>
        <h2 className="text-[32px] tracking-[2.32px] uppercase font-bold">
          Something went wrong!
        </h2>
        <p className="text-[18px] tracking-[1.08px] uppercase font-semibold mb-[24px]">
          The server made a dumb dumb
        </p>
        <Button text={"Try Again"} handleClick={() => reset} />
      </section>
    </div>
  );
}
