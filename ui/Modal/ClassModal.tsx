import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "@/redux/action/UserAction";
import {getCourseFilter} from "@/redux/action/CourseAction";
import {createClassThunk, editClassThunk} from "@/redux/action/ClassAction";
import {useRouter} from "next/router";
import {AppDispatch, RootState} from "@/redux/store";

const ClassModal = ({editClass, isEditClass, onClose}: {editClass: any; isEditClass: boolean; onClose: () => void}) => {
    const [instructor, setInstructor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [courseId, setCourseId] = useState('');
    const [duration, setDuration] = useState('');
    const [participant, setParticipant] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const allUsers  = useSelector((state: RootState) => state.user.allUsers);
    const allCourse = useSelector((state: RootState) => state.course.course);
    const user = useSelector((state: RootState) => state.user.user);

    const router = useRouter();

    const getFilter = async () => {
        await dispatch(getCourseFilter('publish'))
        await dispatch(getAllUsers())
    }

    useEffect(() => {
        getFilter()
    }, [])

    useEffect(() => {
        if (allCourse && allCourse.length > 0 && !isEditClass) {
            setCourseId(allCourse[0].id);
        }
    }, [allCourse, isEditClass]);

    useEffect(() => {
        if (allUsers && allUsers.length > 0 && !isEditClass) {
            setInstructor(allUsers[0].employee_id);
        }
    }, [allUsers, isEditClass]);

    useEffect(() => {
        if (user) {
            setUserId(user.employee_id);
        }
    }, [user])

    useEffect(() => {
        if (editClass && isEditClass) {
            setInstructor(editClass.instructor);
            setStartDate(editClass.start_date);
            setEndDate(editClass.end_date);
            setCourseId(editClass.course_id);
            setDuration(editClass.duration);
            setParticipant(editClass.participants)
        } else {
            resetForm();
        }
    }, [editClass, isEditClass])

    const resetForm = () => {
        setInstructor('');
        setStartDate('');
        setEndDate('');
        setCourseId('');
        setDuration('');
        setParticipant('')
    }

    useEffect(() => {
        if (!allUsers) {
            getAllUsers()
        }
    }, [allUsers])

    const submitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(createClassThunk({ instructor, startDate, endDate, courseId, duration, participant, userId }));

        if (result.payload.success) {
            setTimeout(() => {
                resetForm();
                setErrorMessage('')
            }, 100);
            onClose();
        } else {
            setErrorMessage(result.payload.message);
        }
    };

    console.log(courseId);
    
    const submitUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(editClassThunk({ id: editClass.id, instructor, startDate, endDate, courseId, duration, participant, userId }));

        if (result.payload.success) {
            setTimeout(() => {
                resetForm();
                setErrorMessage('')
            }, 100);
            onClose();
        } else {
            setErrorMessage(result.payload.message);
        }
    };

    return (
        <>
            <div
                className="rbt-default-modal modal fade"
                id="modalClass"
                tabIndex={-1}
                aria-labelledby="ClassLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="rbt-round-btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <i className="feather-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="inner rbt-default-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className="modal-title mb--20" id="ClassLabel">
                                            Update Class
                                        </h5>
                                        <div className="course-field mb--15">
                                            <h6>Instructor</h6>
                                            <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                                                <select className="w-100"
                                                        value={instructor}
                                                        onChange={(e) => setInstructor(e.target.value)}
                                                >
                                                    {
                                                        allUsers && allUsers.map((item, index) => (
                                                            <option key={index}
                                                                    value={item.employee_id}>{item.employee_id} - {item.fullname}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="course-field mb--15">
                                            <h6>Course</h6>
                                            <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                                                <select className="w-100"
                                                        value={courseId}
                                                        onChange={(e) => setCourseId(e.target.value)}
                                                >
                                                    {
                                                        allCourse && allCourse.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.topic_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="course-field mb--15">
                                            <label htmlFor="duration">Duration</label>
                                            <input type="text" id="duration" name="duration" value={duration}
                                                   onChange={(e) => setDuration(e.target.value)}/>
                                        </div>
                                        <div className="course-field mb--15">
                                            <label htmlFor="participant">Participants</label>
                                            <textarea id="participant" rows={4} value={participant}
                                                      placeholder="Enter Employee ID, separate by comma. Ex: 773,655,59"
                                                      onChange={(e) => setParticipant(e.target.value)}></textarea>
                                        </div>
                                        <div className="course-field mb--15 row">
                                            <div className="col-lg-6">
                                                <label htmlFor="startDate">Start Date</label>
                                                <input type="datetime-local" id="startDate" name="startDate" value={startDate}
                                                       onChange={(e) => setStartDate(e.target.value)}/>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="endDate">End Date</label>
                                                <input type="datetime-local" id="endDate" name="endDate" value={endDate}
                                                       onChange={(e) => setEndDate(e.target.value)}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-circle-shape"></div>

                        {errorMessage && <div style={{color: "red", marginBottom: "10px"}}>{errorMessage}</div>}
                        <div className="modal-footer pt--30 justify-content-between">
                            <div className="form-submit-group">
                                <button type="submit"
                                        onClick={isEditClass ? submitUpdate : submitCreate}
                                        data-bs-dismiss="modal"
                                        className="rbt-btn btn-md btn-gradient hover-icon-reverse w-30">
                                        <span className="icon-reverse-wrapper">
                                            <span className="btn-text">
                                                {isEditClass ? 'Update' : 'Save'}</span>
                                            <span className="btn-icon">
                                                <i className="feather-arrow-right"></i>
                                            </span>
                                            <span className="btn-icon">
                                                <i className="feather-arrow-right"></i>
                                            </span>
                                        </span>
                                </button>
                            </div>
                            <div className="modal-footer pt--30">
                                <button
                                    type="button"
                                    className="rbt-btn btn-border btn-md radius-round-10"
                                    data-bs-dismiss="modal"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassModal;
