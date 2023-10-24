import FilterSection from "./FilterSection";
import { filterPlatforms, years } from "../../constants";

export default function Filters({ searchParams }) {
  return (
    <div>
      {filterPlatforms.map((platform) => {
        <FilterSection
          name={platform.name}
          param={"platforms"}
          value={platform.hardware}
          searchParams={searchParams}
        />;
      })}
      {years.map((years) => {
        <FilterSection
          name={years.name}
          param={"years"}
          value={years.years}
          searchParams={searchParams}
        />;
      })}
    </div>
  );
}
