import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByPrevClassThunk } from "@/redux/action/ClassAction";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store";

const TableFinalResult = ({ courseType, resultData, quizData, setEditClass, setFailsId, classId, setModal }: { courseType: any; resultData: any; quizData: any; setEditClass: any; setFailsId: any; classId: any; setModal: any }) => {

    const newClass = useSelector((state: RootState) => state.class.newClass);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getByPrevClassThunk(classId))
    }, [classId])

    const handleCreateNewClass = (isUpdateNewClass: boolean) => {
        if (resultData) {
            let failItem = resultData.filter((item: { is_scored: string }) => item.is_scored === 'Failed');
            let employeeIds = failItem.map((item: { employee_id: string }) => item.employee_id);

            let uniqueFailedIds = Array.from(new Set<string>(employeeIds));
            let resultString = uniqueFailedIds.join(',');

            setFailsId(resultString);

            if (isUpdateNewClass) {
                setEditClass(newClass);
                setModal('new');
            } else {
                setEditClass(null);
                setModal('');
            }
        } else {
            toast.error('Something went wrong!')
        }
    }

    const calculatePassRateByKey = (data: any) => {
        const questionPassingRates: Record<string, { total: number; passed: number }> = {};

        data.forEach((attempt: any) => {
            let text_result = JSON.parse(attempt.text_result);
            Object.keys(text_result).forEach((questionId: string) => {
                if (!questionPassingRates[questionId]) {
                    questionPassingRates[questionId] = { total: 0, passed: 0 };
                }

                questionPassingRates[questionId].total++;

                if (text_result[questionId] === "pass") {
                    questionPassingRates[questionId].passed++;
                }
            });
        });
        const passingRateResult: Record<string, string> = {};

        Object.keys(questionPassingRates).forEach(questionId => {
            const { total, passed } = questionPassingRates[questionId];
            const passingRate = total === 0 ? 0 : (passed / total) * 100;

            passingRateResult[questionId] = passingRate.toFixed(0);
        });

        return passingRateResult;
    }

    return (
        <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30 row">
            <div className="col-lg-9">
                <div className="section-title d-flex justify-content-end mb--15">
                    {courseType === 'Lesson & Test' && (
                        <button
                            className="rbt-btn btn-xs btn-gradient hover-icon-reverse"
                            type="button"
                            onClick={() => handleCreateNewClass(!!newClass)}
                        >
                            <span className="icon-reverse-wrapper">
                                <span className="btn-text">
                                    {newClass ? 'Update New Class (Class Existed)' : 'Create New Class'}
                                </span>
                                <span className="btn-icon">
                                    <i className="feather-plus-circle"></i>
                                </span>
                                <span className="btn-icon">
                                    <i className="feather-plus-circle"></i>
                                </span>
                            </span>
                        </button>
                    )}
                </div>

                <table className="rbt-table table table-borderless">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Final Score / Total Score</th>
                            <th>Result</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultData ? Object.values(resultData).map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.employee_id}</td>
                                <td>{item.fullname}</td>
                                <td width={'140px'}>{(parseFloat((item.score / item.total_score).toFixed(4)) * 100).toFixed(2)}%</td>
                                <td className={item.is_scored === 'Passed' ? 'color-success' : item.is_scored === 'Failed' ? 'color-danger' : 'color-warning'}>
                                    {item.is_scored}
                                </td>
                            </tr>
                        )) :
                            <>No data.</>
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-lg-3">
                <div className="section-title d-flex justify-content-end mb--15">
                    <button className="rbt-btn btn-xs bg-info-opacity opacity-0"></button>
                </div>
                <table className="rbt-table table table-borderless">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Pass Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizData ? Object.values(quizData).map((item: any, index: number) => {
                            let passRate = calculatePassRateByKey(resultData)

                            return (
                                <tr key={item.id}>
                                    <td>Question {index + 1}</td>
                                    <td>{passRate?.[item.id]}%</td>
                                </tr>
                            )
                        }) :
                            <>Some thing went wrong!</>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableFinalResult;