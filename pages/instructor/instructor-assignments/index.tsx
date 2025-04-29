import Separator from "@/components/common/Separator";
import FooterOne from "@/ui/Footer/Footer-One";
import HeaderStyleTen from "@/ui/Header/HeaderStyle-Ten";
import MobileMenu from "@/ui/Header/MobileMenu";
import Cart from "@/ui/Header/Offcanvas/Cart";
import Assignments from "@/components/instructor/Assignments";
import InstructorDashboardHeader from "@/components/instructor/InstructorDashboardHeader";
import InstructorDashboardSidebar from "@/components/instructor/InstructorDashboardSidebar";
import PageHead from "@/ui/Head";
import BackToTop from "@/ui/backToTop";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuizAttempts from "@/components/instructor/QuizAttempts";
import { ToastContainer } from "react-toastify";

const AssignmentsPage = () => {
    const [modal, setModal] = useState<string>('');
    const [editClass, setEditClass] = useState<any>(null);
    const [failIds, setFailsId] = useState<any>(null);
    const [classId, setClassId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    console.log("classId:", classId, "modal:", modal);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (router.isReady) { // <- thêm check isReady
            const classId =
                typeof router.query.classId === "string"
                    ? parseInt(router.query.classId)
                    : Array.isArray(router.query.classId)
                        ? parseInt(router.query.classId[0])
                        : null;
            setClassId(classId);
        }
    }, [router.isReady, router.query.classId]);

    if (!mounted) {
        return null; // hoặc return <LoadingSpinner />
    }

    return (
        <>
            <PageHead title="Instructor Assignments - Online Courses & Education NEXTJS14 Template" />
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
                            <InstructorDashboardHeader classId={classId} failIds={failIds} editClass={editClass}/>
                            <div className="row g-5">
                                <div className="col-lg-3">
                                    <InstructorDashboardSidebar />
                                </div>

                                <div className="col-lg-9">
                                    {
                                        classId !== null ?
                                            <QuizAttempts classId={classId} setFailsId={setFailsId}
                                                setEditClass={setEditClass} setModal={setModal} setClassId={setClassId} />
                                            : <Assignments setModal={setModal}
                                                setEditClass={setEditClass} setClassId={setClassId}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BackToTop />
            <ToastContainer />
            <Separator />
            <FooterOne />
        </>
    );
};

export default AssignmentsPage;
