import Link from "next/link";

const ViewScore = ({result, classes}) => {

    return (
        <>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                    <div className="section-title d-flex justify-content-end mb--20">
                        <Link
                            className="rbt-btn btn-xs bg-info-opacity radius-round"
                            href="/instructor/instructor-enrolled-course"
                        >
                            Back
                        </Link>
                    </div>

                    {result ? (
                        <div>
                            {result.is_scored === "Failed" ? (
                                <div className="bg-color-warning-opacity text-center py-4">
                                    <div>You didn’t complete the course.</div>
                                    <p>Don’t worry! You can try again and succeed next time.</p>
                                </div>
                            ) : result.is_scored === "Passed" ? (
                                <div className="bg-color-success-opacity text-center py-4">
                                    <p>Congratulation! You’ve completed the course!</p>
                                </div>
                            ) : (
                                <div className="bg-color-warning-opacity text-center py-4">
                                    <p>Waiting For Score</p>
                                </div>
                            )}
                            <div className="row mt--20">
                                <div className="col-lg-2">
                                    <p><b>Final Score</b></p>
                                    <p><b>Status</b></p>
                                    {
                                        result.is_scored === 'Passed' &&
                                        <p><b>Certificate</b></p>
                                    }
                                    {
                                        result.is_scored === 'Failed' &&
                                        <p><b>Note</b></p>
                                    }
                                </div>
                                <div className="col-lg-8">
                                    {result.is_scored !== "Wait" ? (
                                        <>
                                            <p>
                                                {result.score} / {result.total_score}
                                            </p>
                                            <p>
                                                {result.is_scored === 'Failed' ? 'Not Passed' : result.is_scored}{" "}
                                                {result.is_scored === "Passed" ? "🎓" : "❌"}
                                            </p>
                                            {
                                                result.is_scored === 'Failed' &&
                                                <p>The system will send a reminder email once a new make-up class is
                                                    scheduled</p>
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <p>NaN / {result.total_score}</p>
                                            <p>Pending</p>
                                        </>
                                    )}
                                </div>
                                <div className="col-lg-2">
                                    {
                                        (classes?.status === 'Completed' && result.is_scored === 'Passed') && (
                                            <button
                                                className="rbt-btn btn-md btn-gradient"
                                                type="button"
                                                
                                            >
                                            <span className="icon-reverse-wrapper">
                                                <span className="btn-text">View Detail</span>
                                            </span>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-color-warning-opacity text-center py-4">
                            <p>Something went wrong!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewScore;
