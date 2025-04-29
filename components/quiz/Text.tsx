import React from "react";

const TextAnswer = ({ answer, setAnswer }) => {
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
        </>
    );
};

export default TextAnswer;
