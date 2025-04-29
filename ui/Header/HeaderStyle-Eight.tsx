import React from "react";
import { useRouter } from "next/router";
import HeaderSix from "./Headers/Header-Six";
import HeaderTopSeven from "./Header-Top/HeaderTop-Seven";
import DarkSwitch from "./dark-switch";
import { HeaderProps } from "./interface";

const HeaderStyleEight = ({ headerSticky, headerType, bgColor }: HeaderProps) => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
      <DarkSwitch />
      <header
        className={`rbt-header ${
          path === "/08-language-academy" ? "" : "rbt-dark-header-8"
        } rbt-header-8 rbt-transparent-header`}
      >
        <div className="rbt-sticky-placeholder"></div>
        <HeaderTopSeven
          gapSpaceBetween="header-space-betwween"
          bgColor="bg-color-transparent"
          flexDirection=""
        />

        <HeaderSix
          sticky="header-sticky"
          gapSpaceBetween=""
          navigationEnd="rbt-navigation-end"
          btnClass="rbt-switch-btn btn-gradient btn-sm hover-transform-none"
          btnText="Join Now"
        />
      </header>
    </>
  );
};

export default HeaderStyleEight;
