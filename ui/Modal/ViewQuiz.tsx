import React, { useMemo } from "react";

const ViewQuiz = ({ viewQuiz }: { viewQuiz: any }) => {
    const options: string[] = useMemo(() => {
        try {
            return viewQuiz?.options ? JSON.parse(viewQuiz.options) : [];
        } catch {
            return [];
        }
    }, [viewQuiz?.options]);

    const answers: string[] = useMemo(() => {
        if (viewQuiz?.type === 'Matching Information') {
            try {
                return viewQuiz?.answers ? JSON.parse(viewQuiz.answers) : [];
            } catch {
                return [];
            }
        }
        return [];
    }, [viewQuiz?.answers, viewQuiz?.type]);

    if (!viewQuiz) {
        return <>Loading...</>;
    }

    return (
        <div
            className="rbt-default-modal modal fade"
            id="viewQuiz"
            tabIndex={-1}
            aria-labelledby="viewQuizLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <button
                                type="button"
                                className="rbt-round-btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="feather-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="rbt-single-quiz">
                                <h4>{viewQuiz.question}</h4>
                            </div>
                            <div>
                                {viewQuiz.type === 'Single Choice' && options.map((item, index) => (
                                    <div className="rbt-form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`question-${viewQuiz.id}`}
                                            id={`rbt-radio-${viewQuiz.id}-${index}`}
                                            value={item}
                                            disabled
                                            checked={viewQuiz.answers.includes(item)}
                                        />
                                        <label className="form-check-label" htmlFor={`rbt-radio-${viewQuiz.id}-${index}`}>
                                            {item}
                                        </label>
                                    </div>
                                ))}

                                {viewQuiz.type === 'Multiple Choice' && options.map((item, index) => (
                                    <div className="rbt-form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`rbt-checkbox-${viewQuiz.id}-${index}`}
                                            name={`question-${viewQuiz.id}`}
                                            value={item}
                                            disabled
                                            checked={viewQuiz.answers.includes(item)}
                                        />
                                        <label className="form-check-label" htmlFor={`rbt-checkbox-${viewQuiz.id}-${index}`}>
                                            {item}
                                        </label>
                                    </div>
                                ))}

                                {viewQuiz.type === 'True/False' && options.map((item, index) => (
                                    <div className="rbt-form-check" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`question-${viewQuiz.id}`}
                                            id={`rbt-radio-${viewQuiz.id}-${index}`}
                                            value={item}
                                            disabled
                                            checked={viewQuiz.answers.includes(item)}
                                        />
                                        <label className="form-check-label" htmlFor={`rbt-radio-${viewQuiz.id}-${index}`}>
                                            {item}
                                        </label>
                                    </div>
                                ))}

                                {viewQuiz.type === 'Text Answer' && (
                                    <p><b>Answer: </b> {viewQuiz.answers}</p>
                                )}

                                {viewQuiz.type === 'Matching Information' && (
                                    <>
                                        {options.map((item, index) => {
                                            const letter = String.fromCharCode(97 + index); // 'a', 'b', ...
                                            return (
                                                <div className="rbt-form-check row align-items-stretch" key={index}>
                                                    <div className="col-lg-6 d-flex">
                                                        <div className="border radius-4 mb--10 px-4 py-3 w-100" style={{ wordBreak: 'break-word' }}>
                                                            {index + 1}. {item}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 d-flex">
                                                        <div className="border radius-4 mb--10 px-4 py-3 w-100" style={{ wordBreak: 'break-word' }}>
                                                            {letter}. {answers[index]}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div className="d-flex flex-wrap">
                                            {options.map((_, index) => {
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
                                    </>
                                )}
                            </div>

                            <hr className="mt--20" />

                            <p><b>Type: </b> {viewQuiz.type}</p>
                            <p><b>Category: </b> [{viewQuiz.cate_code}] {viewQuiz.cate}</p>
                            <p><b>Sub Category: </b> [{viewQuiz.sub_cate_code}] {viewQuiz.sub_cate}</p>
                            <p><b>Correct Feedback: </b> {viewQuiz.correct_feedback} - <a href={viewQuiz.correct_url} target="_blank" rel="noopener noreferrer">Correct Url</a></p>
                            <p><b>Incorrect Feedback: </b> {viewQuiz.incorrect_feedback} - <a href={viewQuiz.incorrect_url} target="_blank" rel="noopener noreferrer">Incorrect Url</a></p>
                        </div>
                        <div className="top-circle-shape"></div>

                        <div className="d-flex justify-content-end">
                            <div className="pt--30">
                                <button
                                    type="button"
                                    className="rbt-btn btn-border btn-md radius-round-10"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewQuiz;
