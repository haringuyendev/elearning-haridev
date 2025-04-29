import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "@/redux/store";
import {getCheckProcessThunk} from "@/redux/action/ClassAction";
import Link from "next/link";
import Image from "next/image";

interface ClassWidgetProps {
    data: {
        id: number;
        course_id: number;
        courseBanner: string;
        code: string;
        courseName: string;
        status: string;
        username: string;
        instructor: string;
        userteam: string;
        [key: string]: any;
    };
    userId: number;
    activeTab: string;
    isProgress?: boolean;
    isEdit?: boolean;
}

const ClassWidget = ({data, userId, activeTab, isProgress, isEdit}: ClassWidgetProps) => {
    const dispatch: AppDispatch = useDispatch();

    const checkProcess = useSelector((state: RootState) => state.class.checkProcess);
    const [checkDone, setCheckDone] = useState(false);

    useEffect(() => {
        dispatch(getCheckProcessThunk({ classId: data.id, userId }));
    }, [data.id, userId, dispatch])

    useEffect(() => {
        setCheckDone(false);
    }, [activeTab]);

    const allCompleted = useMemo(() => {
        if (checkProcess && checkProcess.length > 0) {
            return checkProcess.every((item: { is_done: boolean }) => item.is_done);
        }
        return false;
    }, [checkProcess]);

    useEffect(() => {
        setCheckDone(allCompleted);
    }, [allCompleted]);

    return (
        <>
            <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                    {
                        data.status !== 'Upcoming' ?
                            <Link href={`/course-details/${data.course_id}?classId=${data.id}`}>
                                <img
                                    width={330}
                                    height={227}
                                    src={data.courseBanner ?? '/images/client/avater-01.png'}
                                    alt={data.code}
                                />
                                <div className="rbt-badge-3 bg-white text-center">
                                    <span>{data.status}</span>
                                </div>
                            </Link>
                            :
                            <>
                                <img
                                    width={330}
                                    height={227}
                                    src={data.courseBanner ?? '/images/client/avater-01.png'}
                                    alt={data.code}
                                />
                                <div className="rbt-badge-3 bg-white text-center">
                                    <span>{data.status}</span>
                                </div>
                            </>
                    }

                </div>
                <div className="rbt-card-body">
                    <h4 className="rbt-card-title rbt-text-2-lines">
                        {
                            data.status !== 'Upcoming' ?
                                <Link href={`/course-details/${data.course_id}?classId=${data.id}`}
                                      title={data.courseName}>
                                    {data.courseName}
                                    <p className="color-body">{data.code}</p>
                                </Link>
                                :
                                <a title={data.courseName}>
                                    {data.courseName}
                                    <p className="color-body">{data.code}</p>
                                </a>
                        }
                    </h4>

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
                            By <Link href="#">{data.username} - {data.instructor}</Link>
                            <br/>
                            {data.userteam}
                        </div>
                    </div>

                    {checkDone && (
                        <div className="rbt-card-bottom">
                            <Link className="rbt-btn-link left-icon"
                                  href={`/instructor/instructor-enrolled-course?classId=${data.id}`}>
                                <i className="feather-eye"></i> View Detail
                            </Link>
                            <span className="rbt-btn-link left-icon cursor-pointer">
                                <i className="feather-anchor"> Done</i>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default React.memo(ClassWidget);
