import React, {useEffect} from "react";

import Matching from "@/components/quiz/Matching";
import TextAnswer from "@/components/quiz/Text";
import SingleChoice from "@/components/quiz/SingleChoice";
import {getSubCategories} from "@/redux/action/CategoryAction";
import {useDispatch, useSelector} from "react-redux";
import { QuestionProps } from "@/components/quiz/interface";
import { AppDispatch, RootState } from "@/redux/store";


const Question = ({
          setNewOptions, setContent, setAnswer, setQuestion, setQuestionImage,
          setCategory, setSubCategory, setCorrectFb, setCorrectUrl, setIncorrectUrl, setIncorrectFb, setAnswerMatching,
          setSelectedOption, newOptions, answer, answerMatching, selectedOption, question, questionImage,
                      category, subCategory, content, correctFb, correctUrl, incorrectUrl, incorrectFb, status, setStatus
      }: QuestionProps) => {

    const allCategory = useSelector((state: RootState) => state.category.allCategory);
    const subCategories = useSelector((state: RootState) => state.category.subCateFetch); // Fetch sub-categories based on selected category
    const dispatch = useDispatch<AppDispatch>();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        setNewOptions([""])
        setAnswerMatching([""])
    };

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
        dispatch(getSubCategories(e.target.value))
    }

    return (
        <>
            <div className="content">
                <div className="course-field mb--20">
                    <label htmlFor="modal-field-3">Write your question here</label>
                    <input id="question" type="text" placeholder="Question" value={question}
                           onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="course-field mb--20">
                    <label htmlFor="modal-field-3">Image</label>
                    <input id="question-image" type="text" placeholder="Image Link" value={questionImage}
                           onChange={(e) => setQuestionImage(e.target.value)}
                    />
                </div>
                <div className="course-field mb--20 row">
                    <div className="col-lg-6">
                        <label>Category</label>
                        <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                            <select className="w-100"
                                    value={category}
                                    onChange={handleSelectCategory}
                            >
                                {
                                    allCategory && allCategory.map((item: any, index: any) => (
                                        <option key={index} value={item.id}>{item.category} ({item.category_code})</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <label>Sub Category</label>
                        <select className="w-100"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                        >
                            {
                                subCategories && subCategories.map((item: any, index: any) => (
                                    <option key={index} value={item.id}>{item.sub_category} ({item.sub_category_code})</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="course-field mb--20">
                    <h6>Status</h6>
                    <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                        <select
                            className="w-100"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="course-field mb--20">
                    <h6>Select your question type</h6>
                    <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                        <select
                            className="w-100"
                            value={selectedOption}
                            onChange={handleSelectChange}
                        >
                            <option>True/False</option>
                            <option>Single Choice</option>
                            <option>Multiple Choice</option>
                            <option>Text Answer</option>
                            <option>Matching</option>
                        </select>
                    </div>
                </div>
                <div className="course-field mb--20">
                    <label htmlFor="modal-field-3">Description (Optional)</label>
                    <input id="description" type="text" placeholder="Description" value={content}
                           onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="course-field mb--20 row">
                    <div className="col-lg-6">
                        <label htmlFor="modal-field-3">Correct Feedback</label>
                        <input id="correct-fb" type="text" placeholder="Correct Feedback" value={correctFb}
                               onChange={(e) => setCorrectFb(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="modal-field-3">Correct URL</label>
                        <input id="correct-url" type="text" placeholder="Correct URL" value={correctUrl}
                               onChange={(e) => setCorrectUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="course-field mb--20 row">
                    <div className="col-lg-6">
                        <label htmlFor="modal-field-3">Incorrect Feedback</label>
                        <input id="incorrect-fb" type="text" placeholder="Incorrect Feedback" value={incorrectFb}
                               onChange={(e) => setIncorrectFb(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="modal-field-3">Incorrect URL</label>
                        <input id="incorrect-url" type="text" placeholder="Incorrect URL" value={incorrectUrl}
                               onChange={(e) => setIncorrectUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className={`course-field mt--20 ${
                        selectedOption === "True/False" ? "d-block" : "d-none"
                    }`}
                >
                    <TextAnswer answer={answer} setAnswer={setAnswer}/>
                </div>
                <div
                    className={`course-field mt--20 ${
                        selectedOption === "Matching" ? "d-block" : "d-none"
                    }`}
                >
                    <Matching answerMatching={answerMatching} newOptions={newOptions}
                              setAnswerMatching={setAnswerMatching} setNewOptions={setNewOptions}/>
                </div>
                <div
                    className={`course-field mt--20 ${
                        selectedOption === "Single Choice" ? "d-block" : "d-none"
                    }`}
                >
                    <SingleChoice answer={answer} newOptions={newOptions} setAnswer={setAnswer}
                                  setNewOptions={setNewOptions}/>
                </div>
                <div
                    className={`course-field mt--20 ${
                        selectedOption === "Multiple Choice" ? "d-block" : "d-none"
                    }`}
                >
                    <Matching answerMatching={answerMatching} newOptions={newOptions}
                              setAnswerMatching={setAnswerMatching} setNewOptions={setNewOptions}/>
                </div>
                <div
                    className={`course-field mt--20 ${
                        selectedOption === "Text Answer" ? "d-block" : "d-none"
                    }`}
                >
                    <TextAnswer answer={answer} setAnswer={setAnswer}/>
                </div>
            </div>
        </>
    );
};

export default Question;
