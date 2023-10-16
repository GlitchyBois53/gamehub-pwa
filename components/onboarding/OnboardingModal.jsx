"use client";

import { useStore } from "../../app/store";
import Button from "../shared/Button";
import Dot from "../shared/Dot";

export default function OnboardingModal({
  title,
  description,
  buttonText,
  href,
  step,
  children,
}) {
  const theme = useStore((store) => store.theme);

  return (
    <article
      className={`${
        theme === "light"
          ? "bg-back-light md:shadow-black/25"
          : "bg-back-dark md:shadow-black/50"
      } p-[32px] md:max-w-[575px] w-full md:shadow-nav `}
    >
      <section className="flex items-center justify-between pb-[24px]">
        <h1 className="text-[24px] uppercase tracking-[1.8px] font-bold">
          {title}
        </h1>
        <img
          src="/logo.png"
          alt="gamehub-logo"
          className="w-[40px] object-contain"
        />
      </section>
      <p
        className={`${
          theme === "light" ? "text-black/50" : "text-white/50"
        } text-[14px] font-medium tracking-[0.84px]`}
      >
        {description}
      </p>
      <div>{children}</div>
      {href && buttonText && (
        <>
          <hr
            className={`w-full border-t-[0.5px] my-[24px] ${
              theme === "light" ? "border-black/20" : "border-white/20"
            }`}
          />
          <Button
            text={buttonText}
            isLink={true}
            href={href}
            attributes="text-[16px] tracking-[0.96px] py-[13px]"
          />
        </>
      )}
      <div className="flex gap-[18px] mt-[32px] justify-center">
        <Dot isActive={step === 1} />
        <Dot isActive={step === 2} />
        <Dot isActive={step === 3} />
      </div>
    </article>
  );
}
