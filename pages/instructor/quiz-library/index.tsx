import PageHead from "@/ui/Head";
import HeaderStyleTen from "@/ui/Header/HeaderStyle-Ten";
import MobileMenu from "@/ui/Header/MobileMenu";
import Cart from "@/ui/Header/Offcanvas/Cart";
import Separator from "@/components/common/Separator";
import FooterOne from "@/ui/Footer/Footer-One";
import BackToTop from "@/ui/backToTop";
import Quiz from "@/components/instructor/Quiz";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import QuizSidebar from "@/components/instructor/QuizSideBar";

const EventSiderbarPage = () => {
  const [editQuiz, setEditQuiz] = useState(null);
  const [viewQuiz, setViewQuiz] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState<{ value: string, label: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['']);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>(['']);
  const [selectedType, setSelectedType] = useState<{ value: string, label: string }[]>([]);

  const resetState = () => {
    setSelectedTeam([]);
    setSelectedCategory(['']);
    setSelectedSubCategory(['']);
    setSelectedType([]);
  }

  return (
    <>
      <PageHead title="Event Siderbar - Online Courses & Education NEXTJS14 Template" />

      <HeaderStyleTen headerSticky="rbt-sticky" />
      <MobileMenu />
      <Cart />
      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image" />
      </div>
      <div className="rbt-counterup-area rbt-section-overlayping-top rbt-section-gapBottom pt--200">
        <div className="container-fluid pr--60 pl--60">
          <div className="row row--30 gy-5">
            <div className="col-lg-3 col-xl-3 order-1 order-lg-1">
              <QuizSidebar
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                resetState={resetState} />
            </div>
            <div className="col-lg-9 col-xl-9 order-2 order-lg-2">
              <Quiz
                setViewQuiz={setViewQuiz}
                editQuiz={editQuiz}
                selectedTeam={selectedTeam}
                selectedCategory={selectedCategory}
                selectedSubCategory={selectedSubCategory}
                selectedType={selectedType}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <BackToTop />
      <Separator />
      <FooterOne />
    </>
  );
};

export default EventSiderbarPage;
