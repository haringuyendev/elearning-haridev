const ModalViewResult = ({ scoreData, result, course, userId, quizzesData }: { scoreData: any, result: any, course?: any, userId?: any, quizzesData: any }) => {
    const scores = (scoreData && scoreData !== 'undefined')
        ? JSON.parse(scoreData)
        : null;

    return (
        <div
            className="rbt-default-modal modal fade"
            id="modalViewResult"
            tabIndex={-1}
            aria-labelledby="ViewResultLabel"
            aria-hidden={true}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
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
                        <div className="inner rbt-default-form">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h5 className="modal-title mb--20" id="ViewResultLabel">
                                        View Detail Result
                                    </h5>
                                    <div className="rbt-accordion-style rbt-accordion-01 rbt-accordion-06 accordion">
                                        <div className="accordion" id="tutionaccordionExamplea1">
                                            {/* Accordion Item 1 */}
                                            <div className="accordion-item card">
                                                <h2 className="accordion-header card-header" id="finalResult">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#finalResultCollapse"
                                                        aria-expanded="true"
                                                        aria-controls="finalResultCollapse"
                                                    >
                                                        <h5 className="color-primary">Final Result</h5>
                                                    </button>
                                                </h2>
                                                <div id="finalResultCollapse" className="accordion-collapse collapse show"
                                                    aria-labelledby="finalResult">
                                                    <div className="accordion-body card-body">
                                                        <table className="rbt-table table table-borderless mt--30">
                                                            <thead>
                                                                <tr>
                                                                    <th>Question</th>
                                                                    <th>Result</th>
                                                                    <th>Your Score</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {quizzesData && Object.values(quizzesData).map((item, index) => {
                                                                    const textResult = result ? JSON.parse(result.text_result) : null;
                                                                    const resultForTest = textResult[item.id];
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>Question {index + 1}</td>
                                                                            <td className={(resultForTest === 'pass') ? 'text-success' : 'text-danger'}>{(resultForTest === 'pass') ? 'Passed' : 'Failed'}</td>
                                                                            <td>{Array.isArray(scores) ? ((resultForTest === 'pass') ? scores[index] : 0) : '-'}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Accordion Item 2 */}
                                            <div className="accordion-item card">
                                                <h2 className="accordion-header card-header" id="detailResult">
                                                    <button
                                                        className="accordion-button"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#detailResultCollapse"
                                                        aria-expanded="false"
                                                        aria-controls="detailResultCollapse"
                                                    >
                                                        <h5 className="color-primary">Detail Result</h5>
                                                    </button>
                                                </h2>
                                                <div id="detailResultCollapse" className="accordion-collapse collapse"
                                                    aria-labelledby="detailResult">
                                                    <div className="accordion-body card-body">
                                                        {quizzesData && Object.values(quizzesData).map((item, index) => {
                                                            console.log(item)
                                                            const parsedAnswers = result ? JSON.parse(result.answers) : null;
                                                            const answerForQuiz = parsedAnswers[item.id];
                                                            const hasAnswer = Array.isArray(answerForQuiz) && answerForQuiz.length > 0;

                                                            const textResult = result ? JSON.parse(result.text_result) : null;
                                                            const resultForTest = textResult[item.id];

                                                            return (
                                                                <div className="accordion-item card" key={index}>
                                                                    <h2 className="accordion-header card-header" id={`question-${index}`}>
                                                                        <button
                                                                            className="accordion-button color-secondary"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target={`#question-collapse-${index}`}
                                                                            aria-expanded="false"
                                                                            aria-controls={`#question-collapse-${index}`}
                                                                        >
                                                                            Question {index + 1}: {item.question}
                                                                        </button>
                                                                    </h2>
                                                                    <div id={`question-collapse-${index}`} className="accordion-collapse collapse">
                                                                        <div className="accordion-body card-body">
                                                                            <table className="rbt-table table table-borderless mt--30">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style={{ width: '40%' }}>Correct Answer</th>
                                                                                        <th style={{ width: '40%' }}>My Answer</th>
                                                                                        <th>Result</th>
                                                                                        <th>My Score</th>
                                                                                        <th>Total Score</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {(() => {
                                                                                                // If item.answers is an array, display each item
                                                                                                if (Array.isArray(item.answers)) {
                                                                                                    return item.answers.map((answer, idx) => <div key={idx}>{answer}</div>);
                                                                                                }
                                                                                                // If item.answers is a string that looks like an array, try to parse it
                                                                                                if (typeof item.answers === 'string') {
                                                                                                    try {
                                                                                                        const parsed = JSON.parse(item.answers);
                                                                                                        if (Array.isArray(parsed)) {
                                                                                                            return parsed.map((answer, idx) => <div key={idx}>{answer}</div>);
                                                                                                        }
                                                                                                    } catch (e) {
                                                                                                        // Not a JSON array, just display as string
                                                                                                    }
                                                                                                    return <div>{item.answers}</div>;
                                                                                                }
                                                                                                // Fallback
                                                                                                return <div>{String(item.answers)}</div>;
                                                                                            })()}
                                                                                        </td>
                                                                                        <td>{hasAnswer ? answerForQuiz.join(', ') : 'No Answer'}</td>
                                                                                        <td className={(resultForTest === 'pass') ? 'text-success' : 'text-danger'}>{(resultForTest === 'pass') ? 'Passed' : 'Failed'}</td>
                                                                                        <td>{Array.isArray(scores) ? ((resultForTest === 'pass') ? scores[index] : 0) : '-'}</td>
                                                                                        <td>{Array.isArray(scores) ? scores[index] : '-'}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            {resultForTest === 'pass' ? (
                                                                                <p className="color-primary small">
                                                                                    {item.correct_feedback} <a href={item.correct_url} target="_blank" rel="noopener noreferrer" className="color-primary">Link</a>
                                                                                </p>
                                                                            ) :
                                                                                <p className="color-primary small">
                                                                                    {item.incorrect_feedback} <a href={item.incorrect_url} target="_blank" rel="noopener noreferrer" className="color-primary">Link</a>
                                                                                </p>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top-circle-shape"></div>

                    <div className="modal-footer pt--30 justify-content-between">
                        <div className="modal-footer pt--30">
                            <button
                                type="button"
                                className="rbt-btn btn-border btn-md radius-round-10"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalViewResult;