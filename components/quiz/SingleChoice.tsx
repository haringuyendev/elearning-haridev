import React from "react";

const SingleChoice = ({ newOptions, setNewOptions, answer, setAnswer }) => {
    const handleAddOption = () => {
        setNewOptions([...newOptions, ""]);
    };

    const handleDeleteOption = (index) => {
        const updatedOptions = newOptions.filter((_, i) => i !== index);
        setNewOptions(updatedOptions);
    };

    return (
        <>
            <div className="course-field mb--20">
                <label htmlFor="modal-field-3">Answer</label>
                <input id="answer" type="text"
                       placeholder="Answer"
                       value={answer}
                       onChange={(e) => setAnswer(e.target.value)}
                />
            </div>
            <div className="course-field mb--20">
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

        </>
    );
};

export default SingleChoice;