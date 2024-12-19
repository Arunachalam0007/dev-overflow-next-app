import React, { ReactNode } from "react";

import NavBar from "@/components/navigation/navbar";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default RootLayout;
