"use client";

import { signIn, signOut } from "next-auth/react";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn('google')}>
      <div>
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.signIn className="h-5 w-5" />
          <span className="sr-only">Login</span>
        </div>
      </div>
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
