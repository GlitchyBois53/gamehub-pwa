// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <article className="min-h-screen flex justify-center items-center">
      <SignIn
        appearance={{
          elements: {
            headerTitle: "uppercase tracking-[0.96px] font-bold text-[#202020]",
            headerSubtitle:
              "uppercase text-[12px] tracking-[0.56px] font-semibold text-black/60",
            socialButtonsIconButton: "rounded-[2px]",
            dividerText:
              "uppercase tracking-[0.56px] text-[12px] font-semibold",
            formFieldLabel:
              "uppercase tracking-[0.56px] text-[12px] font-semibold text-[#202020]",
            formFieldInput:
              "rounded-[2px] border-[1px] border-[#202020]/20 uppercase text-[12px] tracking-[0.56px] font-medium text-[#202020] placeholder-[#202020]/60 outline-none",
            formButtonPrimary:
              "rounded-[2px] uppercase tracking-[0.72px] text-[14px] font-semibold text-white bg-game-grad hover:opacity-90",
            footerActionText:
              "uppercase tracking-[0.52px] text-[11px] font-semibold text-black/60",
            footerActionLink:
              "uppercase tracking-[0.52px] text-[11px] font-semibold bg-game-grad bg-clip-text text-transparent hover:bg-clip-text hover:text-transparent hover:opacity-90",
            card: "rounded-[7px] game-shadow",
          },
        }}
      />
    </article>
  );
}
