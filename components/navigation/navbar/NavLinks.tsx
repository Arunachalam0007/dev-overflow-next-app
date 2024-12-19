"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/routes";
import { cn } from "@/lib/utils";

function NavLinks({ isMobileNav = false }: { isMobileNav: boolean }) {
  const pathname = usePathname();
  console.log("pathname: ", pathname);

  const userId = 1;

  return (
    <>
      {sidebarLinks.map((sidebarLink) => {
        // Active link
        const isActive =
          (pathname.includes(sidebarLink.route) &&
            sidebarLink.route.length > 1) ||
          pathname === sidebarLink.route;

        // Dynamic Profile Link
        if (sidebarLink.route === "/profile") {
          if (userId) sidebarLink.route = sidebarLink.route + `/${userId}`;
        }
        console.log("isActive: ", isActive);
        console.log("sidebarLink: ", sidebarLink);
        const LinkComponent = (
          <Link
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              " rounded-lg flex items-center justify-start gap-4 bg-transparent p-4"
            )}
            href={sidebarLink.route}
            key={sidebarLink.label}
          >
            <Image
              src={sidebarLink.imgURL}
              width={20}
              height={20}
              alt={sidebarLink.label}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg: hidden"
              )}
            >
              {sidebarLink.label}
            </p>
          </Link>
        );

        return (
          <SheetClose key={sidebarLink.label} asChild>
            {LinkComponent}
          </SheetClose>
        );
      })}
    </>
  );
}

export default NavLinks;
