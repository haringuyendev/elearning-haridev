import BreadCrumb from "@/components/common/BreadCrumb";
import FooterOne from "@/ui/Footer/Footer-One";
import HeaderStyleTen from "@/ui/Header/HeaderStyle-Ten";
import MobileMenu from "@/ui/Header/MobileMenu";
import Cart from "@/ui/Header/Offcanvas/Cart";
import Login from "@/components/login/Login";
import PageHead from "@/ui/Head";
import BackToTop from "@/ui/backToTop";
import React from "react";
import NewsletterThree from "@/components/newsletters/Newsletter-Three";

const LoginPage = () => {
  return (
    <>
      <PageHead title="Login & Register - Online Courses & Education NEXTJS14 Template" />
          <HeaderStyleTen headerSticky="rbt-sticky"/>
          <MobileMenu />
          <Cart />
          <BreadCrumb title="Login & Register" text="Login & Register" />

          <div className="rbt-elements-area bg-color-white rbt-section-gap">
            <div className="container">
              <div className="row gy-5 row--30">
                <Login />
              </div>
            </div>
          </div>

          <div className="rbt-newsletter-area bg-gradient-6 ptb--50">
            <NewsletterThree />
          </div>

          <BackToTop />
          <FooterOne />
    </>
  );
};

export default LoginPage;
