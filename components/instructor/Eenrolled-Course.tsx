import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getEnrollClassThunk } from "@/redux/action/ClassAction";
import ClassWidget from "@/components/instructor/ClassWidget";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import Pagination from "@/components/Common/Pagination";
import {useRouter} from "next/router";
import Select from "react-select";
import { AppDispatch, RootState } from "@/redux/store";
import { Option } from "@/redux/interface/common";
import { setToggle } from "@/redux/reducer/UiSlices";

const EnrolledCourses = ({ userId }: { userId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [sort, setSort] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState('Upcoming');
    const [page, setPage] = useState(1);
    const limit = 10;
    const {toggle}=useSelector((state: RootState)=>state.ui)
    const {enrollClass, loading} = useSelector((state: RootState) => state.class);
    const totalPages = useSelector((state: RootState) => state.class.totalPages);

    const sortByStatus = [
        {value: "", label: "Select..."},
        {value: "Newest", label: "Newest"},
        {value: "Oldest", label: "Oldest"},
        {value: "AZ", label: "A to Z"},
        {value: "ZA", label: "Z to A"},
    ];

    useEffect(() => {
        dispatch(getEnrollClassThunk({userId, status: selectedTab, page, limit, search: sort}))
    }, [selectedTab, page, limit, sort])

    const handleClick = (num: number) => {
        setPage(num);
        dispatch(getEnrollClassThunk({userId, status: selectedTab, page, limit, search: sort}));
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
                        <h4 className="rbt-title-style-3">Enrolled Courses</h4>
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
                                    data-bs-toggle="tab"
                                    data-bs-target="#upcoming"
                                    className={`tab-button ${selectedTab === 'Upcoming' ? 'active' : ''}`}
                                    onClick={() => setSelectedTab('Upcoming')}
                                    role="tab"
                                >
                                    <span className="title">Upcoming</span>
                                </Link>
                            </li>
                            <li role="presentation">
                                <Link
                                    href="#"
                                    data-bs-toggle="tab"
                                    data-bs-target="#in-progress"
                                    className={`tab-button ${selectedTab === 'In Progress' ? 'active' : ''}`}
                                    onClick={() => setSelectedTab('In Progress')}
                                    role="tab"
                                >
                                    <span className="title">In Progress</span>
                                </Link>
                            </li>
                            <li role="presentation">
                                <Link
                                    href="#"
                                    data-bs-toggle="tab"
                                    data-bs-target="#completed"
                                    className={`tab-button ${selectedTab === 'Completed' ? 'active' : ''}`}
                                    onClick={() => setSelectedTab('Completed')}
                                    role="tab"
                                >
                                    <span className="title">Completed</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        <div
                            className={`tab-pane fade ${selectedTab === 'Upcoming' ? 'active show' : ''}`}
                            id="Upcoming"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {
                                    loading ? (
                                        <>
                                            <div className={`w-full`}>
                                                <LoadingSpinner />
                                            </div>
                                        </>
                                    ) : (enrollClass && enrollClass.length > 0) ? enrollClass.map((slide: any, index: any) => (
                                        <div
                                            className={`w-full`}
                                            key={`class-coming-${index}`}
                                        >
                                            <ClassWidget
                                                data={slide}
                                                userId={Number(userId)}
                                                isProgress={true}
                                                isEdit={userId === slide.instructor}
                                                activeTab={selectedTab}
                                            />
                                        </div>
                                    )) :
                                        <div className="col-lg-4 col-md-6 col-12">
                                            No data.
                                        </div>
                                }
                            </div>
                        </div>

                        <div
                            className={`tab-pane fade ${selectedTab === 'In Progress' ? 'active show' : ''}`}
                            id="in-progress"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {
                                    loading ? (
                                        <>
                                            <div className={`w-full`}>
                                                <LoadingSpinner />
                                            </div>
                                        </>
                                    ) : (enrollClass && enrollClass.length > 0) ? enrollClass.map((slide: any, index: any) => (
                                        <div
                                            className={`${toggle ? 'col-lg-4 col-md-6 col-12' : 'grid-item'}`}
                                            key={`class-processing-${index}`}
                                        >
                                            <ClassWidget
                                                data={slide}
                                                userId={Number(userId)}
                                                isProgress={false}
                                                activeTab={selectedTab}
                                                isEdit={userId === slide.instructor}
                                            />
                                        </div>
                                    )) :
                                        <div className="col-lg-4 col-md-6 col-12">
                                            No data.
                                        </div>
                                }
                            </div>
                        </div>

                        <div
                            className={`tab-pane fade ${selectedTab === 'Completed' ? 'active show' : ''}`}
                            id="completed"
                            role="tabpanel"
                        >
                            <div className={`g-5 ${toggle ? 'row' : 'list-view-layout'}`}>
                                {
                                    loading ? (
                                        <>
                                            <div className={`w-full`}>
                                                <LoadingSpinner />
                                            </div>
                                        </>
                                    ) : (enrollClass && enrollClass.length > 0) ? enrollClass.map((slide: any, index: any) => (
                                        <div
                                            className={`${toggle ? 'col-lg-4 col-md-6 col-12' : 'grid-item'}`}
                                            key={`class-completed-${index}`}
                                        >
                                            <ClassWidget
                                                data={slide}
                                                userId={Number(userId)}
                                                isProgress={false}
                                                isEdit={userId === slide.instructor}
                                                activeTab={selectedTab}
                                            />
                                        </div>
                                    )) :
                                        <div className="col-lg-4 col-md-6 col-12">
                                            No data.
                                        </div>
                                }
                            </div>
                        </div>

                        {totalPages && Number(totalPages) > 1 && (
                            <div className="row">
                                <div className="col-lg-12 mt--60">
                                    <Pagination totalPages={totalPages} pageNumber={page} handleClick={handleClick} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnrolledCourses;
