import { useRouter, usePathname } from "next/navigation";
import Button from "./Button";

export default function filterSection({
  param,
  value,
  name,
  fn,
  searchParams,
  activeFilter,
}) {
  const router = useRouter();
  const pathname = usePathname();

  let route = pathname + "?" + fn(param, value);
  let variant = "tertiary";

  // if the route includes the title parameter, remove it
  if (route.includes("title")) {
    route = route.replace(/&title=\w+/g, ``);
  }

  // if the route includes the search parameter, remove it
  if (searchParams == value) {
    variant = "";
    route = pathname + "?" + fn(param, "");
  }

  return (
    <>
      {activeFilter === param && (
        <Button
          text={name}
          handleClick={() => router.push(route)}
          variant={variant}
          attributes="text-[10.5px] tracking-[0.7px] py-[6px] px-[16px]"
        />
      )}
    </>
  );
}
