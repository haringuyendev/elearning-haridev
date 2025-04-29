import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { deleteClassThunk, getClassThunk, updateClassStatusThunk } from "@/redux/action/ClassAction";
import Pagination from "@/components/common/Pagination";
import Select, { MultiValue, SingleValue } from "react-select";
import { useRouter } from "next/router";
import { getCourseFilter } from "@/redux/action/CourseAction";
import { getAllUsers } from "@/redux/action/UserAction";
import { AppDispatch, RootState } from "@/redux/store";
import AssignmentsTableSkeleton from "@/components/skeletons/AssignmentsTableSkeleton";
import { openModal } from "@/redux/reducer/ModalSlices";
import { setToggle } from "@/redux/reducer/UiSlices";
interface OptionsType {
    value: string,
    label: string
}
const Assignments = ({ setModal, setEditClass, setClassId }: { setModal: any; setEditClass: any; setClassId: any }) => {
    const {
        classes,
        loading,
        totalPages,
        participantsCount,
        instructors,
        courses,
        totalClass
    } = useSelector((state: RootState) => state.class);
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState(1);
    const [statusOpt, setStatusOpt] = useState<OptionsType[]>([])
    const [status, setStatus] = useState<OptionsType>({ label: "Select...", value: "" })
    const [insructor, setInstructor] = useState<OptionsType[]>([])
    const [course, setCourse] = useState<OptionsType[]>([])
    const limit = 10; // Number of quizzes per page
    const router = useRouter();
    const allCourses = useSelector((state: RootState) => state.course.course);
    const allUsers = useSelector((state: RootState) => state.user.allUsers);
    const {toggle} = useSelector((state: RootState) => state.ui);
    const getStatusOptions = () => {
        if (statusOpt?.length == 0) {
            const uniqueStatuses = Array.from(new Set(classes.map((classes: any) => classes.status)));
            const sortByStatus = [
                ...uniqueStatuses.map((status) => ({
                    value: status,
                    label: status,
                })),
            ];
            setStatusOpt(sortByStatus)
        }
    }
    

    const filterParams = useMemo(() => ({
        page,
        limit,
        status: status?.value,
        course: course.map((i) => i.value).join(','),
        instructor: insructor.map((i) => i.value).join(','),
        search: Array.isArray(router.query.search) ? router.query.search[0] : router.query.search || null
    }), [page, limit, status, course, insructor, router.query.search]);

    useEffect(() => {
        if (classes.length && statusOpt.length < 2) {
            getStatusOptions();
        }
    }, [classes]);

    useEffect(() => {
        setStatusOpt([]);
        dispatch(getCourseFilter('publish'))
        dispatch(updateClassStatusThunk())
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getClassThunk(filterParams));
    }, [filterParams]);

    useEffect(() => {
        if (allCourses.length && router.query.course) {
            const selectedIds = (router.query.course as string).split(',');
            const selectedCourses = allCourses
                .filter(item => selectedIds.includes(item.id))
                .map(item => ({
                    value: item.id,
                    label: item.topic_name,
                }));
            setCourse(selectedCourses);
        }

        if (allUsers?.length && router.query.instructor) {
            const selectedIds = (router.query.instructor as string).split(',');
            const selectedInstructors = allUsers
                .filter(item => selectedIds.includes(item.employee_id))
                .map(item => ({
                    value: item.employee_id,
                    label: `${item.employee_id} - ${item.username}`,
                }));
            setInstructor(selectedInstructors);
        }
    }, [allCourses, allUsers, router.query.course, router.query.instructor]);

    const handleClick = (num: number) => {
        setPage(num);
        dispatch(getClassThunk({
            page,
            limit,
            status: Array.isArray(router.query.status) ? router.query.status[0] : router.query.status || null,
            course: Array.isArray(router.query.course) ? router.query.course[0] : router.query.course || null,
            instructor: Array.isArray(router.query.instructor) ? router.query.instructor[0] : router.query.instructor || null,
            search: Array.isArray(router.query.search) ? router.query.search[0] : router.query.search || null
        }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleEditClass = (item: any) => {
        dispatch(openModal({
            type: 'CLASS_EDIT',
            props: { editClass: item, isEditClass: true }, // 🚀 Gửi dữ liệu vào modal luôn
        }));
    }

    const handleDeleteClass = (classId: any) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            dispatch(deleteClassThunk(classId));
        }
    }

    const handleClear = () => {
        setCourse([]);
        setInstructor([]);
        setStatus({ label: "Select...", value: "" });
        setStatusOpt([]);
    }

    const courseOpts = allCourses ? allCourses.map((item: any) => ({
        value: item.id,
        label: `${item.topic_name}`
    })) : [];

    const instructorOpts = allUsers ? allUsers.map((item: any) => ({
        value: item.employee_id,
        label: `${item.employee_id} - ${item.username}`
    })) : [];
    return (
        <>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                    <div
                        className="section-title rbt-sorting-list d-flex flex-wrap align-items-center justify-content-between">
                        <h4 className="rbt-title-style-3">Classes</h4>
                        <div className="rbt-short-item switch-layout-container">
                            <ul className="course-switch-layout">
                                <li className="course-switch-item">
                                    <button
                                        className={`rbt-grid-view ${toggle
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
                                        className={`rbt-grid-view ${!toggle
                                            ? "active"
                                            : ""
                                            }`}
                                        title="List Layout"
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <i className="feather-list"></i>
                                        <span className="text ms-2">List</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="rbt-dashboard-filter-wrapper">
                        <div className="row g-5">
                            <div className="col-lg-4">
                                <div className="filter-select rbt-modern-select">
                                    <span className="select-label d-block">Course</span>
                                    <Select
                                        isMulti
                                        options={courseOpts}
                                        value={course}
                                        onChange={(selected: MultiValue<OptionsType>) => {
                                            if (!selected) {
                                                setCourse([]);
                                                return;
                                            }
                                            setCourse([...selected]);
                                        }}
                                        instanceId="sortByCourse"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="filter-select rbt-modern-select">
                                    <span className="select-label d-block">Instructor</span>
                                    <Select
                                        isMulti
                                        options={instructorOpts}
                                        value={insructor}
                                        onChange={(selected: MultiValue<OptionsType>) => {
                                            if (!selected) {
                                                setInstructor([]);
                                                return;
                                            }
                                            setInstructor([...selected]);
                                        }}
                                        instanceId="sortByInstructor"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="filter-select rbt-modern-select">
                                    <span className="select-label d-block">Status</span>
                                    <Select
                                        instanceId="sortByAuthor"
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        value={status}
                                        onChange={(
                                            selected: SingleValue<OptionsType>
                                        ) => {
                                            setStatus(selected ? selected : { value: "", label: "Select..." });
                                        }}
                                        options={statusOpt}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-1 d-flex align-items-center">
                                <div className="filter-select rbt-modern-select">
                                    <button className="rbt-btn btn-xs"
                                        onClick={() => handleClear()}>Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mt--30" />
                    <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
                        <p className="small">Total : {totalClass} items</p>
                        <table className="rbt-table table table-borderless">
                            <thead>
                                <tr>
                                    <th>Class Code</th>
                                    <th>Total Participants</th>
                                    <th>Instructor</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {
                                loading ?
                                    <AssignmentsTableSkeleton />
                                    :

                                    <tbody>
                                        {
                                            classes && classes.length > 0 ? classes.map((item, value) => (
                                                <tr key={item.id}>
                                                    <th>
                                                        <span className="h6 mb--5">{item.code}</span>
                                                        <p className="b3">
                                                            {courses ? (
                                                                <span>
                                                                    Course: <Link
                                                                        href={`/course-details/${courses[item.id]?.id}`}>{courses[item.id]?.topic_name}</Link>
                                                                </span>
                                                            ) :
                                                                'Course Not Found'}
                                                        </p>
                                                    </th>
                                                    <td>
                                                        <p className="b3">{participantsCount ? participantsCount[item.id] : '-'}</p>
                                                    </td>
                                                    <td>
                                                        <p className="b3">{instructors ? item.instructor + ' - ' + instructors[item.id]?.fullname : 'Instructor Not found'}</p>
                                                    </td>
                                                    <td>
                                                        {item.status === 'Upcoming' &&
                                                            <span
                                                                className="rbt-badge-5 bg-color-success-opacity btn-lg color-warning">
                                                                {item.status}
                                                            </span>
                                                        }
                                                        {item.status === 'In Progress' &&
                                                            <span
                                                                className="rbt-badge-5 bg-color-success-opacity btn-lg color-primary">
                                                                {item.status}
                                                            </span>
                                                        }
                                                        {item.status === 'Completed' &&
                                                            <span
                                                                className="rbt-badge-5 bg-color-success-opacity btn-lg color-success">
                                                                {item.status}
                                                            </span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="rbt-button-group justify-content-end">
                                                            <button
                                                                className="rbt-btn btn-xs bg-warning-opacity radius-round color-warning"
                                                                title="View"
                                                                type="button"
                                                                onClick={() => setClassId(item.id)}
                                                            >
                                                                <i className="feather-eye pl--0" />
                                                            </button>
                                                            <button
                                                                className="rbt-btn btn-xs bg-color-primary-opacity radius-round color-primary"
                                                                title="Edit"
                                                                type="button"
                                                                onClick={() => handleEditClass(item)}
                                                            >
                                                                <i className="feather-edit pl--0" />
                                                            </button>
                                                            <button
                                                                className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                                                title="Delete"
                                                                type="button"
                                                                onClick={() => handleDeleteClass(item.id)}
                                                            >
                                                                <i className="feather-trash-2 pl--0" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : <>No data.</>
                                        }
                                    </tbody>}
                        </table>
                    </div>
                </div>
            </div>

            {totalPages && totalPages > 1 && (
                <div className="row">
                    <div className="col-lg-12 mt--60">
                        <Pagination totalPages={totalPages} pageNumber={page} handleClick={handleClick} />
                    </div>
                </div>
            )}
        </>);
};

export default Assignments;
