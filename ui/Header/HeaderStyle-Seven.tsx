import React from "react";

import HeaderTopTwo from "./Header-Top/HeaderTop-Two";
import HeaderTwo from "./Headers/Header-Two";
import DarkSwitch from "./dark-switch";
import { HeaderProps } from "@/interface/common";

const HeaderStyleSeven = ({ headerSticky, bgColor }:HeaderProps) => {
  return (
    <>
      <DarkSwitch />
      <header className="rbt-header rbt-header-7 rbt-transparent-header">
        <div className="rbt-sticky-placeholder"></div>
        <HeaderTopTwo
          gapSpaceBetween="bg-not-transparent bg-gradient-7 color-white"
          container="container"
        />

        <HeaderTwo
          headerSticky={headerSticky}
          transparent="bg-color-white color-white-variation header-sticky rbt-border-bottom-light"
          gapSpaceBetween=""
          navigationEnd="rbt-navigation-end"
          btnClass="rbt-switch-btn btn-gradient btn-sm hover-transform-none"
          btnText="Join Now"
        />
      </header>
    </>
  );
};

export default HeaderStyleSeven;
