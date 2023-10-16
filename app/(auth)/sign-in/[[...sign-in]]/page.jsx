import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <article className="min-h-screen flex justify-center items-center">
      <SignIn />
    </article>
  );
}
