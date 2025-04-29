import React from "react";

const Matching = ({ answerMatching, setAnswerMatching, newOptions, setNewOptions}) => {

    const handleAddOption = () => {
        setNewOptions([...newOptions, ""]);
    };

    const handleAddAnswer = () => {
        setAnswerMatching([...answerMatching, ""]);
    };

    const handleDeleteOption = (index) => {
        const updatedOptions = newOptions.filter((_, i) => i !== index);
        setNewOptions(updatedOptions);
    };

    const handleDeleteAnswer = (index) => {
        const updatedAnswer = answerMatching.filter((_, i) => i !== index);
        setAnswerMatching(updatedAnswer);
    };

    return (
        <>
            <div className="course-field mb--20 row">
                <small className="mb--20">
                    <i className="feather-info"></i> If choose Matching type, please add equal answer and option.
                </small>
                <div className='col-lg-6'>
                    <label htmlFor="modal-field-3">Answers</label>
                    {answerMatching.map((opt, index) => (
                        <div key={index} className="d-flex items-center mb--20">
                            <input
                                type="text"
                                placeholder={`Answer ${index + 1}`}
                                value={opt}
                                onChange={(e) => {
                                    const updatedAnswer = [...answerMatching];
                                    updatedAnswer[index] = e.target.value;
                                    setAnswerMatching(updatedAnswer);
                                }}
                                className="mr-2"
                            />
                            <button onClick={() => handleDeleteAnswer(index)}
                                    className="rbt-btn rbt-sm-btn mt--5 ml--20 feather-trash-2"></button>
                        </div>
                    ))}
                    <button className="rbt-btn rbt-sm-btn feather-plus" onClick={handleAddAnswer}>Add Answer</button>
                </div>
                <div className='col-lg-6'>
                    <label htmlFor="modal-field-3">Options</label>
                    {newOptions.map((opt, index) => (
                        <div key={index} className="d-flex items-center mb--20">
                            <input
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={opt}
                                onChange={(e) => {
                                    const updatedOptions = [...newOptions];
                                    updatedOptions[index] = e.target.value;
                                    setNewOptions(updatedOptions);
                                }}
                                className="mr-2"
                            />
                            <button onClick={() => handleDeleteOption(index)}
                                    className="rbt-btn rbt-sm-btn mt--5 ml--20 feather-trash-2"></button>
                        </div>
                    ))}
                    <button className="rbt-btn rbt-sm-btn feather-plus" onClick={handleAddOption}>Add Option</button>
                </div>

            </div>

        </>
    );
};

export default Matching;
