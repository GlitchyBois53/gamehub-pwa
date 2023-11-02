// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import { usePathname, useRouter } from "next/navigation";
import {
  ratings,
  gameModes,
  genres,
  themes,
  years,
  filterPlatforms,
} from "../../constants";
import { useCallback } from "react";
import Button from "./Button";

// This component is used to display the active filters and remove them
export default function ActiveFilters({ searchParams }) {
  // finding the active filters
  const activePlatform = filterPlatforms?.find(
    (platform) => platform.hardware == searchParams?.platforms
  );
  const activeYear = years?.find((year) => year?.years == searchParams?.years);
  const activeGenre = genres?.find(
    (genre) => genre?.genreId == searchParams?.genres
  );
  const activeTheme = themes?.find(
    (theme) => theme?.id == searchParams?.themes
  );
  const activeRating = ratings?.find(
    (rating) => rating?.rating == searchParams?.ratings
  );
  const activeGameMode = gameModes?.find(
    (mode) => mode?.id == searchParams?.modes
  );

  return (
    <div className="flex flex-wrap gap-[10px] mt-[12px]">
      <Filter
        activeFilter={activePlatform}
        searchParams={searchParams}
        param={"platforms"}
        text={activePlatform?.name}
      />
      <Filter
        activeFilter={activeYear}
        searchParams={searchParams}
        param={"years"}
        text={activeYear?.name}
      />
      <Filter
        activeFilter={activeGenre}
        searchParams={searchParams}
        param={"genres"}
        text={activeGenre?.name}
      />
      <Filter
        activeFilter={activeTheme}
        searchParams={searchParams}
        param={"themes"}
        text={activeTheme?.name}
      />
      <Filter
        activeFilter={activeRating}
        searchParams={searchParams}
        param={"ratings"}
        text={activeRating?.name}
      />
      <Filter
        activeFilter={activeGameMode}
        searchParams={searchParams}
        param={"modes"}
        text={activeGameMode?.name}
      />
    </div>
  );
}

function Filter({ param, searchParams, activeFilter, text }) {
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const pathname = usePathname();
  const router = useRouter();
  const baseRoute = pathname + "?" + createQueryString(param, "");
  let route = baseRoute;

  return (
    <>
      {activeFilter && (
        <Button
          handleClick={() => router.push(route)}
          text={text}
          icon={"/close-icon-dark.svg"}
          lightIcon={"/close-icon.svg"}
          variant={"secondary"}
          iconWidth="w-[8px] translate-y-[0.5px]"
        />
      )}
    </>
  );
}
