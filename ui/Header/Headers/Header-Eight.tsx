import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import HeaderRightTwo from "../Header-Right/HeaderRight-Two";
import Search from "../Offcanvas/Search";
import Nav from "../Nav";

import logoDark from "../../../public/images/logo/logo-white.png";
import logo from "../../../public/images/logo/logo.png";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/interface/common";
import { RootState } from "@/redux/store";

const HeaderEight = ({
  headerType,
  gapSpaceBetween,
  headerSticky:sticky,
  headerSticky,
  navigationEnd,
  container,
}:HeaderProps) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return (
    <>
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go Back"
        className="rbt-button btn-lg btn btn-border-gradient radius-round hover-transform-none position-absolute"
        style={{
          left: "20px",
          marginTop: "20px",
        }}
      >
        &#8592; Back
      </button>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${sticky}  ${!headerType && isSticky ? `${headerSticky}` : ""
          }`}
      >
        <div className={`${container}`}>
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>

            <div className="header-left rbt-header-content">

              <div className="header-info">
                <div className="logo-dark logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      width={200}
                      height={50}
                      priority={true}
                      alt="Logo Cennos"
                    />
                  </Link>
                </div>
                <div className="logo-light logo">
                  <Link href="/">
                    <Image
                      src={logoDark}
                      width={200}
                      height={50}
                      priority={true}
                      alt="Logo Cennos"
                    />
                  </Link>
                </div>
              </div>

              {/*<div className="header-info d-none d-lg-block">*/}
              {/*  <Category />*/}
              {/*</div>*/}
            </div>

            <div className="rbt-main-navigation d-none d-xl-block">
              <Nav />
            </div>

            <HeaderRightTwo
              userType={userData?.fullname || ''}
              btnText="Enroll Now"
              btnClass="rbt-marquee-btn marquee-auto btn-border-gradient radius-round btn-sm hover-transform-none"
            />
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default HeaderEight;
