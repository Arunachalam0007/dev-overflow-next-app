"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { removeKeysFromUpdateURLQuery, updateURLQuery } from "@/lib/urls";

import { Input } from "../ui/input";

interface seachProps {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
}: seachProps) => {
  // Get value from Search Params
  const searchParams = useSearchParams(); // query=testing which will contains after ? mark

  const pathName = usePathname(); // is current path name is / or /profile

  // Get Query Tag value from search Params
  const query = searchParams.get("query") || ""; // which will get the query tag value of query string

  const [searchQuery, setSearchQuery] = useState(query);

  const router = useRouter();

  useEffect(() => {
    // setTimeout when multiple api call optimsize
    const delayDeboundeFn = setTimeout(() => {
      if (searchQuery) {
        const newUpdatedURL = updateURLQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        console.log("newUpdatedURL: ", newUpdatedURL);

        router.push(newUpdatedURL, { scroll: false });
      } else {
        if (pathName === route) {
          const newUpdatedURL = removeKeysFromUpdateURLQuery({
            params: searchParams.toString(),
            removeKeys: ["query"],
          });
          console.log("We don't have search Query: ", newUpdatedURL);

          router.push(newUpdatedURL, { scroll: false });
        }
      }
    }, 300);

    // return when your key typed
    return () => clearTimeout(delayDeboundeFn);
  }, [router, searchParams, route, searchQuery, pathName]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px]
       grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="Search Icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        className="placeholder paragraph-regular text-dark400_light700
         no-focus border-none shadow-none outline-none"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default LocalSearch;
