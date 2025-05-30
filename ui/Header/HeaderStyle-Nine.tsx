import { HeaderProps } from "@/interface/common";
import HeaderTopMidThree from "./Header-Top/HeaderTopMid-Three";
import HeaderSeven from "./Headers/Header-Seven";
import DarkSwitch from "./dark-switch";

const HeaderStyleNine = ({ headerSticky, bgColor }:HeaderProps) => {
  return (
    <>
      <DarkSwitch />
      <header className="rbt-header rbt-header-9">
        <div className="rbt-sticky-placeholder"></div>

        <div className="rbt-header-middle position-relative rbt-header-mid-1 bg-color-white rbt-border-bottom">
          <HeaderTopMidThree flexDirection="" bgColor={bgColor} />
        </div>

        <HeaderSeven
          transparent="header-not-transparent header-sticky"
          gapSpaceBetween=""
          navigationEnd="rbt-navigation-end"
          btnClass="rbt-switch-btn btn-gradient btn-sm hover-transform-none"
          btnText="Join Now"
        />
      </header>
    </>
  );
};

export default HeaderStyleNine;
