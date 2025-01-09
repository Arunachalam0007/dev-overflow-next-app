"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { removeKeysFromUpdateURLQuery, updateURLQuery } from "@/lib/urls";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

// const listOfFilters = [
//   { name: "Newest", value: "newest" },
//   { name: "Popular", value: "polular" },
//   { name: "Unanswared", value: "unanswared" },
//   { name: "Recommeded", value: "recommended" },
// ];

const listOfFilters = [
  { name: "React", value: "react" },
  { name: "Javascript", value: "javascript" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");

  const [active, setActive] = useState(filterParams || "");

  const handleClickFilter = (clickedFilter: string) => {
    let newURL = "";
    if (clickedFilter === active) {
      setActive("");
      newURL = removeKeysFromUpdateURLQuery({
        params: searchParams.toString(),
        removeKeys: ["filter"],
      });
    } else {
      setActive(clickedFilter);
      newURL = updateURLQuery({
        params: searchParams.toString(),
        key: "filter",
        value: clickedFilter,
      });
    }
    router.push(newURL, { scroll: false });
  };
  return (
    <div className=" mt-10 hidden flex-wrap gap-3 sm:flex">
      {listOfFilters.map((filter) => (
        <Button
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primay-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          key={filter.name}
          onClick={() => handleClickFilter(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
