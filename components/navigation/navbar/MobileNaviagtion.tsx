"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

export function MobileNaviagtion() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          className="invert-colors sm:hidden"
          alt="Menu"
          height={36}
          width={36}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle hidden>Mobile Naviagation</SheetTitle>

        {/*  App Logo link */}
        <Link href="/" className="flex items-center gap-1 ">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Dev
            <span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div className="flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          {/* Nav Links Component */}
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          {/* Button Components */}
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button
                  className="small-medium btn-secondary min-h-[40px] w-full
                 rounded-lg px-4 py-3 shadow-none "
                >
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={ROUTES.SIGN_IN}>
                <Button
                  className="small-medium btn-tertiary text-dark400_light900 min-h-[40px] w-full
                 rounded-lg px-4 py-3 shadow-none "
                >
                  <span className="">Sign up</span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNaviagtion;
