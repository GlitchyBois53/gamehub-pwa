import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Game({ params }) {
  return (
    <div>
      <SignedIn>
        <h1 className="text-green-400">{params.game}</h1>
      </SignedIn>
      
      <SignedOut>
        <h1 className="text-red-400">{params.game}</h1>
      </SignedOut>
    </div>
  );
}
