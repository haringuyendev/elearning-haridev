import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizToMarkThunk } from "@/redux/action/ClassAction";
import TableFinalResult from "@/components/instructor/TableFinalResult";
import QuizResult from "@/components/instructor/QuizResult";
import Overall from "@/components/instructor/Overall";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import QuizAttemptsSkeleton from "@/components/common/QuizAttempSkeleton";

interface QuizAttemptsProps {
  classId: number;
  setEditClass: (data: any) => void;
  setFailsId: (data: any) => void;
  setModal: (modalType: string) => void;
  setClassId: (id: number | null) => void;
}

const QuizAttempts = ({ classId, setEditClass, setFailsId, setModal, setClassId }: QuizAttemptsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { quizData, loading, resultData, scoreData, courseType, completion } = useSelector((state: RootState) => state.class);

  const [selectedTab, setSelectedTab] = useState<'Overall' | 'Result'>('Overall');

  useEffect(() => {
    if (classId !== null && !isNaN(classId)) {
      dispatch(getQuizToMarkThunk(classId));
    }
  }, [classId, dispatch]);

  const renderResultSection = () => (
    <div className="rbt-accordion-style rbt-accordion-01 rbt-accordion-06 accordion" id="tutionaccordionExamplea1">
      {/* Final Result */}
      <div className="accordion-item card">
        <h2 className="accordion-header card-header" id="headingFinalResult">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFinalResult"
            aria-expanded="true"
            aria-controls="collapseFinalResult"
          >
            <h5 className="color-primary">Final Result</h5>
          </button>
        </h2>
        <div
          id="collapseFinalResult"
          className="accordion-collapse collapse show"
          aria-labelledby="headingFinalResult"
          data-bs-parent="#tutionaccordionExamplea1"
        >
          <div className="accordion-body card-body">
            <TableFinalResult
              courseType={courseType}
              resultData={resultData}
              quizData={quizData}
              setModal={setModal}
              setEditClass={setEditClass}
              setFailsId={setFailsId}
              classId={classId}
            />
          </div>
        </div>
      </div>
  
      {/* Detail Result */}
      <div className="accordion-item card">
        <h2 className="accordion-header card-header" id="headingDetailResult">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDetailResult"
            aria-expanded="false"
            aria-controls="collapseDetailResult"
          >
            <h5 className="color-primary">Detail Result</h5>
          </button>
        </h2>
        <div
          id="collapseDetailResult"
          className="accordion-collapse collapse"
          aria-labelledby="headingDetailResult"
          data-bs-parent="#tutionaccordionExamplea1"
        >
          <div className="accordion-body card-body">
            {quizData && Object.values(quizData).map((item: any, index) => (
              <div className="accordion-item card" key={index}>
                <h2 className="accordion-header card-header" id={`headingQuestion${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseQuestion${index}`}
                    aria-expanded="false"
                    aria-controls={`collapseQuestion${index}`}
                  >
                    [{item.type}] - [{item.quiz_id}] - {item.question}
                  </button>
                </h2>
                <div
                  id={`collapseQuestion${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingQuestion${index}`}
                  data-bs-parent="#collapseDetailResult"
                >
                  <div className="accordion-body card-body">
                    <QuizResult
                      resultData={resultData}
                      quiz={item}
                      classId={classId}
                      isExpanded={false}
                      setIsExpanded={() => {}}
                      score={scoreData ? JSON.parse(scoreData)[index] : '-'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  

  if (loading) return <QuizAttemptsSkeleton/>
  
  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title d-flex justify-content-between">
          <h4 className="rbt-title-style-3">Mark Test</h4>
          <button className="rbt-btn btn-xs bg-info-opacity radius-round" onClick={() => setClassId(null)}>
            Back
          </button>
        </div>

        {/* Tabs chỉ khi Lesson & Test */}
        {!loading && courseType && courseType === 'Lesson & Test' && (
          <>
            <div className="advance-tab-button mb--30">
                <ul
                    className="nav nav-tabs tab-button-style-2 justify-content-start"
                    id="myTab-4"
                    role="tablist"
                >
                    <li role="presentation">
                        <Link
                            href="#"
                            className={`tab-button ${selectedTab === 'Overall' ? 'active' : ''}`}
                            onClick={
                                e => {
                                    e.preventDefault();
                                    setSelectedTab('Overall');
                                }
                            }
                            role="tab"
                        >
                            <span className="title">Overall</span>
                        </Link>
                    </li>
                    <li role="presentation">
                        <Link
                            href="#"
                            className={`tab-button ${selectedTab === 'Result' ? 'active' : ''}`}
                            onClick={
                                e => {
                                    e.preventDefault();
                                    setSelectedTab('Result');
                                }
                            }
                            role="tab"
                        >
                            <span className="title">Detail Result</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="tab-content">
              <div className={`tab-pane fade ${selectedTab === 'Overall' ? 'active show' : ''}`}>
                <Overall completion={completion} quizData={quizData} resultData={resultData} />
              </div>
              <div className={`tab-pane fade ${selectedTab === 'Result' ? 'active show' : ''}`}>
                {renderResultSection()}
              </div>
            </div>
          </>
        )}

        {/* Always show ResultSection */}
        {!loading && courseType && courseType !== 'Lesson & Test' && renderResultSection()}
      </div>
    </div>
  );
};

export default QuizAttempts;
