import Separator from "@/components/common/Separator";
import FooterOne from "@/ui/Footer/Footer-One";
import HeaderStyleTen from "@/ui/Header/HeaderStyle-Ten";
import MobileMenu from "@/ui/Header/MobileMenu";
import Cart from "@/ui/Header/Offcanvas/Cart";
import Dashboard from "@/components/instructor/Dashboard";
import InstructorDashboardHeader from "@/components/instructor/InstructorDashboardHeader";
import InstructorDashboardSidebar from "@/components/instructor/InstructorDashboardSidebar";
import PageHead from "@/ui/Head";
import BackToTop from "@/ui/backToTop";
import React from "react";

const InstructorDashboard = () => {
  return (
    <>
      <PageHead title="Instructor Dashboard - Online Courses & Education NEXTJS14 Template" />
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" />
          <Cart />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <InstructorDashboardHeader classId={null} failIds={null} editClass={null}/>

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <InstructorDashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                      <Dashboard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BackToTop />
          <Separator />
          <FooterOne />
    </>
  );
};

export default InstructorDashboard;
