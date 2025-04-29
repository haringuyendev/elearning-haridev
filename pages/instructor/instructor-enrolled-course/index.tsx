import Separator from "@/components/common/Separator";
import FooterOne from "@/ui/Footer/Footer-One";
import HeaderStyleTen from "@/ui/Header/HeaderStyle-Ten";
import MobileMenu from "@/ui/Header/MobileMenu";
import Cart from "@/ui/Header/Offcanvas/Cart";
import EnrolledCourses from "@/components/instructor/Eenrolled-Course";
import InstructorDashboardHeader from "@/components/instructor/InstructorDashboardHeader";
import InstructorDashboardSidebar from "@/components/instructor/InstructorDashboardSidebar";
import PageHead from "@/ui/Head";
import BackToTop from "@/ui/backToTop";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ViewScore from "@/components/instructor/OrderHistory";
import { ToastContainer } from "react-toastify";
import { getDetailResultThunk } from "@/redux/action/ClassAction";
import ModalViewResult from "@/components/instructor/ModalViewResult";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const EnrolledCoursePage = () => {
    const router = useRouter();

    const viewId = parseInt(router.query.classId as string)
    const [userId, setUserId] = useState("");

    const user = useSelector((state: RootState) => state.user.user);
    const { classes, quizzesData, scoreData, result } = useSelector((state: RootState) => state.class);

    useEffect(() => {
        if (!isNaN(viewId) && userId) {
            getDetailResultThunk({ classId: viewId, userId });
        }
    }, [viewId, userId, router.query]);

    useEffect(() => {
        if (user) {
            setUserId(user.employee_id);
        }
    }, [user])

    return (
        <>
            <PageHead title="Enrolled Course - Online Courses & Education NEXTJS14 Template" />

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
                                    {
                                        !isNaN(viewId) ? <ViewScore result={result} classes={classes} />
                                            : <EnrolledCourses userId={userId} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
            <ModalViewResult scoreData={scoreData} result={result} userId={userId} quizzesData={quizzesData}/>
            <BackToTop />
            <Separator />
            <FooterOne />
        </>
    );
};

export default EnrolledCoursePage;
