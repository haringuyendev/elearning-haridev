import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "@/redux/action/UserAction";
import {getCourseFilter} from "@/redux/action/CourseAction";
import {createNewClassThunk} from "@/redux/action/ClassAction";
import {AppDispatch, RootState} from "@/redux/store";

const NewClassModal = ({classId, editClass, failIds, onClose}: {classId: any; editClass: any; failIds: any; onClose: () => void}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [participant, setParticipant] = useState(failIds ?? '');
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState("");
    const allUsers  = useSelector((state: RootState) => state.user.allUsers);
    const user = useSelector((state: RootState) => state.user.user);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCourseFilter('publish'))
    }, [])

    useEffect(() => {
        if (user) {
            setUserId(user.employee_id);
        }
    }, [user])

    useEffect(() => {
        if (editClass) {
            setStartDate(editClass.start_date);
            setEndDate(editClass.end_date);
            setParticipant(editClass.participants)
        } else {
            resetForm();
        }
    }, [editClass])

    const resetForm = () => {
        setStartDate('');
        setEndDate('');
        setParticipant(failIds)
    }

    useEffect(() => {
        setParticipant(failIds)
    }, [])

    useEffect(() => {
        if (!allUsers) {
            dispatch(getAllUsers())
        }
    }, [allUsers, dispatch])

    const submitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(createNewClassThunk({classId, startDate, endDate, participant, userId}));

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
                id="modalNewClass"
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
                                            Add Class
                                        </h5>
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
                                        onClick={submitCreate}
                                        data-bs-dismiss="modal"
                                        className="rbt-btn btn-md btn-gradient hover-icon-reverse w-30">
                                        <span className="icon-reverse-wrapper">
                                            <span className="btn-text">
                                                Create</span>
                                            <span className="btn-icon">
                                                <i className="feather-arrow-right"></i>
                                            </span>
                                            <span className="btn-icon">
                                                <i className="feather-arrow-right"></i>
                                            </span>
                                        </span>
                                </button>
                            </div>
                            <div className="">
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

export default NewClassModal;
