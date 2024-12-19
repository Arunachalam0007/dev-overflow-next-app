import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

async function Home() {
  const session = await auth();

  console.log("Session Details: ", session);

  return (
    <>
      <div className="flex-center min-h-screen">
        <form
          className="px-10 pt-[100px]"
          action={async () => {
            "use server"; // below lines used from server side
            await signOut({ redirectTo: ROUTES.SIGN_IN });
          }}
        >
          <Button type="submit">Log out</Button>
        </form>
      </div>
    </>
  );
}

export default Home;
