import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {deleteQuiz} from "@/redux/action/QuizAction";
import {useDispatch} from "react-redux";
import {deleteCourse} from "@/redux/action/CourseAction";
import { AppDispatch } from "@/redux/store";

const CourseWidget = ({
                          data,
                          courseStyle,
                          showDescription,
                          showAuthor,
                          isProgress,
                          isEdit,
                          countLesson,
                          countQuiz
                      }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteCourse = (courseId: number) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            dispatch(deleteCourse(courseId));
        }
    };

    return (
        <>
            <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                    <Link href={`/course-details/${data.id}`}>
                        <img
                            width={330}
                            height={227}
                            src={data?.banner}
                            alt={data.topic_name}
                        />
                        <div className="rbt-badge-3 bg-white text-center">
                            <span>{data.status}</span>
                        </div>
                    </Link>
                </div>
                <div className="rbt-card-body">
                    <h4 className="rbt-card-title rbt-text-2-lines">
                        <Link href={`/course-details/${data.id}`} title={data.topic_name}>{data.topic_name}</Link>
                    </h4>
                    {
                        data.type === 'Lesson & Test' ?
                            <ul className="rbt-meta">
                                <li>
                                    <i className="feather-book"/>
                                    {countLesson ? countLesson[data.id] : '-'} Lessons
                                </li>
                                <li>
                                    <i className="feather-clock"/>
                                    {data.end_time} mins
                                </li>
                            </ul>
                            :
                            <>
                                <ul className="rbt-meta">
                                    <li>
                                        <i className="feather-help-circle"/>
                                        {(countQuiz && countQuiz[data.id]) ? countQuiz[data.id][0] : '-'} Quizzes
                                    </li>
                                    <li>
                                        <i className="feather-clock"/>
                                        {(countQuiz && countQuiz[data.id]) ? countQuiz[data.id][1] : '-'} mins
                                    </li>
                                </ul>
                            </>
                    }


                    {showDescription ? (
                        <p className="rbt-card-text rbt-text-2-lines">{data.overview}</p>
                    ) : (
                        ""
                    )}

                    {courseStyle === "two" && showAuthor && (
                        <div className="rbt-author-meta mb--20">
                            <div className="rbt-avater">
                                <Link href="components/widgets#">
                                    <Image
                                        width={40}
                                        height={40}
                                        src="/images/client/avater-01.png"
                                        alt="Sophia Jaymes"
                                    />
                                </Link>
                            </div>
                            <div className="rbt-author-info">
                                By <Link href="#">Patrick</Link> In{" "}
                                <Link href="#">Languages</Link>
                            </div>
                        </div>
                    )}

                    {!isProgress ? (
                        <div className="rbt-card-bottom">
                            {isEdit ? (
                                <>
                                    <Link className="rbt-btn-link left-icon" href={`/update-course/${data.id}`}>
                                        <i className="feather-edit"></i> Edit
                                    </Link>
                                    <span className="rbt-btn-link left-icon cursor-pointer"
                                          onClick={() => handleDeleteCourse(data.id)}>
                                        <i className="feather-trash"></i> Delete
                                    </span>
                                </>
                            ) : (
                                <Link className="rbt-btn-link" href="#">
                                    Learn More
                                    <i className="feather-arrow-right"/>
                                </Link>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default CourseWidget;
