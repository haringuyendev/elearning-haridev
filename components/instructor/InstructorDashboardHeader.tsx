import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/reducer/ModalSlices";
import { AppDispatch } from "@/redux/store";

const InstructorDashboardHeader = ({classId, failIds, editClass}: {classId: any; failIds: any; editClass: any}) => {
  const router = useRouter();
  const path = router.pathname;
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateClass = () => {
    dispatch(openModal({
      type: 'NEW_CLASS',
      props: { classId: classId, failIds: failIds, editClass: editClass }
    }));
  }
  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="tutor-bg-photo bg_image bg_image--22 height-350" />
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              <Image
                width={300}
                height={300}
                src="/images/team/avatar.jpg"
                alt="Instructor"
              />
            </div>
            <div className="tutor-content">
              <h5 className="title">John Due</h5>
              <div className="rbt-review">
                <div className="rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <span className="rating-count"> (15 Reviews)</span>
              </div>
            </div>
          </div>
          <div className="rbt-tutor-information-right">
            <div className="tutor-btn">
              {
                  (path === "/instructor/instructor-personal-courses" || path === '/instructor/instructor-assignments') && (
                      <button
                          className="rbt-btn btn-md btn-gradient hover-icon-reverse"
                          type="button"
                          onClick={handleCreateClass}
                      >
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text" >Create a New Class</span>
                            <span className="btn-icon">
                              <i className="feather-plus-circle"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-plus-circle"></i>
                            </span>
                          </span>
                      </button>
                  )
              }

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default InstructorDashboardHeader;
