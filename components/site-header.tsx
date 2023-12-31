'use client';

import {siteConfig} from "@/config/site"
import {MainNav} from "@/components/main-nav"
import {ThemeToggle} from "@/components/theme-toggle"
import {LoginButton} from "@/components/buttons.component";
import {useSession} from "next-auth/react";
import {UserNav} from "@/components/user-nav";
import {Loader2} from "lucide-react";


export function SiteHeader() {
  const {data, status} = useSession();
  let jsx = <LoginButton/>;
  if (status === "loading") {
    // jsx = <ClassicSpinner color="#FF5733" />;
    jsx = <Loader2 className="animate-spin"/>
  }
  if (status === "authenticated") {
    jsx = <UserNav name={data?.user?.name!} email={data?.user?.email!} img={data?.user?.image!}/>
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav}/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {jsx}
            <ThemeToggle/>
          </nav>
        </div>
      </div>
    </header>
  )
}
