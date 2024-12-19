"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";

import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

import { Button } from "../ui/button";

function SocialAuthForm() {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  // Sign Handler
  const handleSignIn = async (providerVal: "github" | "google") => {
    try {
      // Sign In Github || Google from Auth.js
      await signIn(
        providerVal,
        // where to go
        {
          callbackUrl: ROUTES.HOME,
          redirect: false,
        }
      );
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign-In Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occured during Sign-IN",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClass}
        onClick={() => {
          handleSignIn("github");
        }}
      >
        <Image
          src="/icons/github.svg"
          alt="Github logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button
        className={buttonClass}
        onClick={() => {
          handleSignIn("google");
        }}
      >
        <Image
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
}

export default SocialAuthForm;
