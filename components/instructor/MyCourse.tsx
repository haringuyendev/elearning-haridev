import Link from "next/link";
import CourseWidgets from "./CourseWidget";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCourse} from "@/redux/action/CourseAction";
import Pagination from "@/components/Common/Pagination";
import Select from "react-select";
import {useRouter} from "next/router";
import {AppDispatch, RootState} from "@/redux/store";
import {Option} from "@/redux/interface/common";
import {setToggle} from "@/redux/reducer/UiSlices";
import LoadingSpinner from "../Common/LoadingSpinner";

const MyCourses = () => {
    const [selectedTab, setSelectedTab] = useState<string>('publish'); // Add 
    const [sort, setSort] = useState<string>('');
    const data = useSelector((state: RootState) => state.course.course);
    const totalPages = useSelector((state: RootState) => state.course.totalPages);
    const {countLesson, loading} = useSelector((state: RootState) => state.course);
    const countQuiz = useSelector((state: RootState) => state.course.countQuiz);
    const {toggle} = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [page, setPage] = useState(1);
    const limit = 10;

    const sortByStatus: Option[] = [
        {value: "", label: "Select..."},
        {value: "Newest", label: "Newest"},
        {value: "Oldest", label: "Oldest"},
        {value: "AZ", label: "A to Z"},
        {value: "ZA", label: "Z to A"},
    ];
    useEffect(() => {
        dispatch(getCourse({status: selectedTab, page:page, limit:limit, search: sort}));
    }, [selectedTab, sort]);

    const handleClick = (num: number) => {
        setPage(num);
        dispatch(getCourse({ status: selectedTab, page: num, limit:limit, search: router.query.search as string }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

   
    return (
        <>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                    <div className="section-title rbt-sorting-list d-flex flex-wrap align-items-center justify-content-between">
                        <h4 className="rbt-title-style-3">My Courses</h4>
                        <div className="rbt-short-item switch-layout-container d-flex">
                            <ul className="course-switch-layout">
                                <li className="course-switch-item">
                                    <button
                                        className={`rbt-grid-view ${
                                            toggle
                                                ? "active"
                                                : ""
                                        }`}
                                        title="Grid Layout"
                                        onClick={() => dispatch(setToggle(!toggle))}
                                    >
                                        <i className="feather-grid"></i>
                                        <span className="text ms-2">Grid</span>
                                    </button>
                                </li>
                                <li className="course-switch-item">
                                    <button
                                        className={`rbt-grid-view ${
                                            !toggle
                                                ? "active"
                                                : ""
                                        }`}
                                        title="List Layout"
                                        onClick={() => dispatch(setToggle(!toggle))}
                                    >
                                        <i className="feather-list"></i>
                                        <span className="text ms-2">List</span>
                                    </button>
                                </li>
                            </ul>

                            <div className="filter-select rbt-modern-select">
                                <Select<Option>
                                    options={sortByStatus}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    defaultValue={sortByStatus.find(option => option.value === (router.query.status as string)) || sortByStatus[0]}
                                    onChange={(selected) => setSort(selected?.value || '')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="advance-tab-button mb--30">
                        <ul
                            className="nav nav-tabs tab-button-style-2 justify-content-start"
                            id="myTab-4"
                            role="tablist"
                        >
                            <li role="presentation">
                                <Link
                                    href="#"
                                    className={`tab-button ${selectedTab === 'publish' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault(); // Ngăn chuyển trang
                                        setSelectedTab('publish'); // Thay đổi tab
                                      }}
                                    role="tab"
                                >
                                    <span className="title">Publish</span>
                                </Link>
                            </li>
                            <li role="presentation">
                                <Link
                                    href="#"
                                    className={`tab-button ${selectedTab === 'pending' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault(); // Ngăn chuyển trang
                                        setSelectedTab('pending'); // Thay đổi tab
                                      }}
                                    role="tab"
                                >
                                    <span className="title">Pending</span>
                                </Link>
                            </li>
                            <li role="presentation">
                                <Link
                                    href="#"
                                    className={`tab-button ${selectedTab === 'draft' ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault(); // Ngăn chuyển trang
                                        setSelectedTab('draft'); // Thay đổi tab
                                      }}
                                    role="tab"
                                >
                                    <span className="title">Draft</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div
                            className={`tab-pane fade ${selectedTab === 'publish' ? 'active show' : ''}`}
                            id="publish-4"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {loading ? (
                                    <div className={`w-full`}>
                                        <LoadingSpinner />
                                    </div>
                                ) : (data && data.length > 0) ? data.map((slide, index) => (
                                    <div
                                        className={`${toggle ? 'col-lg-4 col-md-6 col-12' : 'grid-item'}`}
                                        key={`course-published-${index}`}
                                    >
                                        <CourseWidgets
                                            data={slide}
                                            courseStyle="two"
                                            isEdit={true}
                                            isProgress={false}
                                            showDescription={true}
                                            showAuthor={false}
                                            countLesson={countLesson}
                                            countQuiz={countQuiz}
                                        />
                                    </div>
                                ))
                                    : <div className="col-lg-4 col-md-6 col-12">No data</div>
                                }
                            </div>
                        </div>

                        <div
                            className={`tab-pane fade ${selectedTab === 'pending' ? 'active show' : ''}`}
                            id="pending-4"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {loading ? (
                                    <div className={`w-full`}>
                                    <LoadingSpinner />
                                </div>
                                ) : (data && data.length > 0) ? data.map((slide, index) => (
                                        <div
                                            className={`${toggle ? 'col-lg-4 col-md-6 col-12' : 'grid-item'}`}
                                            key={`course-pending-${index}`}
                                        >
                                            <CourseWidgets
                                                data={slide}
                                                courseStyle="two"
                                                isEdit={true}
                                                isProgress={false}
                                                showDescription={true}
                                                countLesson={countLesson}
                                                countQuiz={countQuiz}
                                                showAuthor={false}
                                            />
                                        </div>
                                    ))
                                    : <div className="col-lg-4 col-md-6 col-12">No data</div>
                                }
                            </div>
                        </div>

                        <div
                            className={`tab-pane fade ${selectedTab === 'draft' ? 'active show' : ''}`}
                            id="draft-4"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {loading ? (
                                    <div className={`w-full`}>
                                    <LoadingSpinner />
                                </div>
                                ) : (data && data.length > 0) ? data.map((slide, index) => (
                                        <div
                                            className={`${toggle ? 'col-lg-4 col-md-6 col-12' : 'grid-item'}`}
                                            key={`course-draft-${index}`}
                                        >
                                            <CourseWidgets
                                                data={slide}
                                                courseStyle="two"
                                            isEdit={true}
                                            isProgress={false}
                                            showDescription={true}
                                            countLesson={countLesson}
                                            countQuiz={countQuiz}
                                            showAuthor={false}
                                        />
                                    </div>
                                ))
                                    :
                                    <div className="col-lg-4 col-md-6 col-12">No data</div>
                                }
                            </div>
                        </div>

                        {totalPages && totalPages > 1 && (
                            <div className="row">
                                <div className="col-lg-12 mt--60">
                                    <Pagination totalPages={totalPages} pageNumber={page} handleClick={handleClick}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyCourses;
