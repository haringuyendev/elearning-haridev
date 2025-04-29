import React, {useState} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {getMark} from "@/redux/action/ClassAction";
import {useRouter} from "next/router";

const QuizResult = ({quiz, resultData, score, classId, setIsExpanded, isExpanded}) => {
    const [manualResults, setManualResults] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();

    const options = typeof quiz.options === 'string' ? JSON.parse(quiz.options) : quiz.options;
    let answers;
    if (quiz?.type === 'Matching Information')
        answers = quiz?.answers ? JSON.parse(quiz.answers) : [];

    const toggleExpand = () => setIsExpanded(prev => !prev);

    const handleManualResult = (id, quizId, userId, testId, result) => {
        setManualResults(prev => ({
            ...prev,
            [id]: result
        }));

        dispatch(getMark(id, quizId, userId, testId, result));
        router.push({
            pathname: '/instructor/instructor-assignments',
            query: {
                classId: classId
            }
        })
        toast.success(result);
    };

    return (
        <div className="rbt-dashboard-table table-responsive mobile-table-750">
            {quiz && (quiz.type === 'Single Choice' || quiz.type === 'Multiple Choice' || quiz.type === 'True/False') &&
                <>
                    <button
                        onClick={toggleExpand}
                        className="btn btn-sm btn-outline-primary mb-2"
                    >
                        {isExpanded ? 'Hide Answers/Options ▲' : 'Show Answers/Options ▼'}
                    </button>

                    {isExpanded && (
                        <div>
                            {options.map((option, index) => (
                                <div className="rbt-form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value={option}
                                        disabled={true}
                                        checked={quiz.answers.includes(option)}
                                    />
                                    <label className="form-check-label"
                                           htmlFor={"rbt-radio-" + quiz.id + "-" + index}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            }
            {quiz && quiz.type === 'Matching Information' &&
                <>
                    <button
                        onClick={toggleExpand}
                        className="btn btn-sm btn-outline-primary mb-2"
                    >
                        {isExpanded ? 'Hide Answers/Options ▲' : 'Show Answers/Options ▼'}
                    </button>

                    {isExpanded && (
                        <div>
                            {options && options.map((item, index) => {
                                const letter = String.fromCharCode(97 + index);

                                return (
                                    <>
                                        <div className="rbt-form-check row align-items-stretch"
                                             key={index}>
                                            <div className="col-lg-6 d-flex">
                                                <div
                                                    className="border radius-4 mb--10 px-4 py-3 w-100"
                                                    style={{wordBreak: 'break-word'}}
                                                >
                                                    {index + 1}. {item}
                                                </div>
                                            </div>
                                            <div className="col-lg-6 d-flex">
                                                <div
                                                    className="border radius-4 mb--10 px-4 py-3 w-100"
                                                    style={{wordBreak: 'break-word'}}
                                                >
                                                    {letter}. {answers[index]}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                            <div className="d-flex flex-wrap">
                                {options && options.map((item, index) => {
                                    const number = index + 1;
                                    const letter = String.fromCharCode(97 + index);

                                    return (
                                        <div className="rbt-form-check mr--10" key={index}>
                                            <p className="border radius-4 mb--10 px-4 py-3">
                                                {number} - {letter}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            }
            {quiz && quiz.type === 'Text Answer' &&
                <>
                    <button
                        onClick={toggleExpand}
                        className="btn btn-sm btn-outline-primary mb-2"
                    >
                        {isExpanded ? 'Hide Answers/Options ▲' : 'Show Answers/Options ▼'}
                    </button>

                    {isExpanded && (
                        <div>
                            {quiz.answers}
                        </div>
                    )}
                </>
            }
            <table className="rbt-table table table-borderless mt--30">
                <thead>
                <tr>
                    <th>Total Score</th>
                    <th>Correct feedback</th>
                    <th>Incorrect feedback</th>
                </tr>
                </thead>
                <tbody>
                {quiz &&
                    <tr>
                        <td>{score}</td>
                        <td>{quiz.correct_feedback ?? '-'}</td>
                        <td>{quiz.incorrect_feedback ?? '-'}</td>
                    </tr>
                }
                </tbody>
            </table>
            <table className="rbt-table table table-borderless">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Answer</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {resultData ? Object.values(resultData).map((item, index) => {

                    const parsedAnswers = JSON.parse(item.answers);
                    const answerForQuiz = parsedAnswers[quiz.id];
                    const hasAnswer = Array.isArray(answerForQuiz) && answerForQuiz.length > 0;

                    const manualStatus = manualResults[item.id];

                    const textResult = JSON.parse(item.text_result);
                    const resultForTest = textResult[quiz.id];

                    return (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.employee_id}</td>
                            <td>{item.employee_id}</td>
                            <td>
                                {hasAnswer ? answerForQuiz.join(', ') : 'No Answer'}
                            </td>
                            <td>
                                {quiz.type !== 'Text Answer' ? (
                                    resultForTest && resultForTest === 'pass' ? (
                                        <a className="left-icon color-success pr--10" href="#">
                                            <i className="feather-check"> Passed</i>
                                        </a>
                                    ) : (
                                        <a className="left-icon color-danger" href="#">
                                            <i className="feather-x"> Failed</i>
                                        </a>
                                    )
                                ) :
                                manualStatus ? (
                                    manualStatus === 'passed' ? (
                                        <a className="left-icon color-success pr--10" href="#">
                                            <i className="feather-check"> Passed</i>
                                        </a>
                                    ) : (
                                        <a className="left-icon color-danger" href="#">
                                            <i className="feather-x"> Failed</i>
                                        </a>
                                    )
                                ) : item.is_scored === 'Wait' ? (
                                    <>
                                        <a
                                            className="rbt-btn-link left-icon color-success pr--10"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleManualResult(item.id, quiz.id, item.employee_id, item.test_id, 'passed');
                                            }}
                                        >
                                            <i className="feather-check"> Pass</i>
                                        </a>
                                        <a
                                            className="rbt-btn-link left-icon color-danger"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleManualResult(item.id, quiz.id, item.employee_id, item.test_id, 'failed');
                                            }}
                                        >
                                            <i className="feather-x"> Fail</i>
                                        </a>
                                    </>
                                ) : (
                                    resultForTest && resultForTest === 'pass' ? (
                                        <a className="left-icon color-success pr--10" href="#">
                                            <i className="feather-check"> Passed</i>
                                        </a>
                                    ) : (
                                        <a className="left-icon color-danger" href="#">
                                            <i className="feather-x"> Failed</i>
                                        </a>
                                    )
                                )}
                            </td>
                        </tr>
                    );
                }) : (
                    <>Something went wrong!</>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default QuizResult;
