import React, { useEffect, useState } from "react";
import Question from "@/components/quiz/Question";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz, updateQuiz } from "@/redux/action/QuizAction";
import { AppDispatch, RootState } from "@/redux/store";

const CreateQuizModal = ({ isEdit, editQuiz, onClose }: { isEdit: boolean, editQuiz: any, onClose: () => void }) => {

    const [newOptions, setNewOptions] = useState([""]);
    const [content, setContent] = useState("");
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const [questionImage, setQuestionImage] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [correctFb, setCorrectFb] = useState("");
    const [correctUrl, setCorrectUrl] = useState("");
    const [incorrectUrl, setIncorrectUrl] = useState("");
    const [incorrectFb, setIncorrectFb] = useState("");
    const [status, setStatus] = useState("Active");
    const [answerMatching, setAnswerMatching] = useState([""]);
    const [selectedOption, setSelectedOption] = useState("True/False");
    const [errorMessage, setErrorMessage] = useState("");
    const [teamId, setTeamId] = useState("");
    const [userId, setUserId] = useState("");

    const user = useSelector((state: RootState) => state.user.user);

    const dispatch = useDispatch<AppDispatch>();
    console.log('Edit Quiz: ', editQuiz)
    useEffect(() => {
        setNewOptions(editQuiz.options ? JSON.parse(editQuiz.options) : [""]);
        setContent(editQuiz.description ?? "");
        setQuestion(editQuiz.question ?? "");
        setQuestionImage(editQuiz.question_image ?? "");
        setCategory(editQuiz.cate_id || "");
        setStatus(editQuiz.status ?? "Active");
        setSubCategory(editQuiz.sub_cate_id ?? "");
        setCorrectFb(editQuiz.correct_feedback ?? "");
        setCorrectUrl(editQuiz.correct_url ?? "");
        setIncorrectUrl(editQuiz.incorrect_url ?? "");
        setIncorrectFb(editQuiz.incorrect_feedback ?? "");
        setSelectedOption(editQuiz.type ?? "True/False");

        if (editQuiz.type === "Matching" || editQuiz.type === "Multiple Choice") {
            setAnswerMatching(editQuiz.answers ? JSON.parse(editQuiz.answers) : [""]);
        } else {
            setAnswer(editQuiz.answers ?? "");
        }


    }, [isEdit, editQuiz]);



    const submitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(createQuiz({
            question, questionImage, selectedOption, content, status,
            correctFb, correctUrl, incorrectFb, incorrectUrl, answer, answerMatching, newOptions, category, subCategory, userId, teamId
        }));

        if (result.payload.success) {
            setTimeout(() => {
                setQuestion("");
                setQuestionImage("");
                setCategory("");
                setSubCategory("");
                setSelectedOption("True/False");
                setContent("");
                setCorrectFb("");
                setCorrectUrl("");
                setIncorrectFb("");
                setIncorrectUrl("");
                setStatus("Active");
                setAnswer("");
                setNewOptions([""]);
                setAnswerMatching([""]);
            }, 100);

            onClose();
        } else {
            setErrorMessage(result.payload.message);
        }
    };

    const submitUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(updateQuiz({
            id: editQuiz.id,
            question,
            questionImage,
            selectedOption,
            content,
            status,
            correctFb,
            correctUrl,
            incorrectFb,
            incorrectUrl,
            answer,
            answerMatching,
            newOptions,
            category,
            subCategory,
            userId,
            teamId
        }));

        if (result.payload.success) {
            setTimeout(() => {
                setQuestion("");
                setQuestionImage("");
                setCategory("");
                setSubCategory("");
                setSelectedOption("True/False");
                setContent("");
                setCorrectFb("");
                setCorrectUrl("");
                setIncorrectFb("");
                setStatus("Active");
                setIncorrectUrl("");
                setAnswer("");
                setNewOptions([""]);
                setAnswerMatching([""]);
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
                id="createQuiz"
                tabIndex={-1}
                aria-labelledby="createQuizLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form className="">
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

                                    <Question
                                        setNewOptions={setNewOptions}
                                        setContent={setContent}
                                        setAnswer={setAnswer}
                                        setQuestion={setQuestion}
                                        setQuestionImage={setQuestionImage}
                                        setCategory={setCategory}
                                        setSubCategory={setSubCategory}
                                        setCorrectFb={setCorrectFb}
                                        setCorrectUrl={setCorrectUrl}
                                        setIncorrectUrl={setIncorrectUrl}
                                        setIncorrectFb={setIncorrectFb}
                                        setAnswerMatching={setAnswerMatching}
                                        setSelectedOption={setSelectedOption}
                                        newOptions={newOptions}
                                        answer={answer}
                                        answerMatching={answerMatching}
                                        selectedOption={selectedOption}
                                        question={question}
                                        questionImage={questionImage}
                                        category={category}
                                        subCategory={subCategory}
                                        content={content}
                                        correctFb={correctFb}
                                        correctUrl={correctUrl}
                                        incorrectUrl={incorrectUrl}
                                        incorrectFb={incorrectFb}
                                        status={status}
                                        setStatus={setStatus}
                                    />

                                </div>
                            </div>
                            <div className="top-circle-shape"></div>

                            {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}
                            <div className="d-flex justify-content-between">
                                <div className="form-submit-group">
                                    <button type="submit"
                                        onClick={isEdit ? submitUpdate : submitCreate}
                                        className="rbt-btn btn-md btn-gradient hover-icon-reverse w-30">
                                        <span className="icon-reverse-wrapper">
                                            <span className="btn-text">Save</span>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateQuizModal;
