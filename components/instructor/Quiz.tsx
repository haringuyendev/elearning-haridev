import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, getQuiz } from "@/redux/action/QuizAction";
import Pagination from "@/components/common/Pagination";
import { getFilterCategory, getAllSubCategories } from "@/redux/action/CategoryAction";
import { useRouter } from "next/router";
import { downloadExcel, exportExcel } from "@/utils/excelUtils";
import {AppDispatch, RootState} from "@/redux/store";
import QuizTableSkeleton from "@/components/skeletons/QuizTableSkeleton";
import { openModal } from "@/redux/reducer/ModalSlices";
interface MatchingItem {
    answers: string;
    options: string;
    cate_code: string;
    sub_cate_code: string;
    question: string;
    question_image: string;
    type: string;
    description: string;
    correct_feedback: string;
    correct_url: string;
    incorrect_feedback: string;
    incorrect_url: string;
}
interface QuizProps {
    editQuiz: any;
    setViewQuiz: (quiz: any) => void;
    selectedTeam: { value: string, label: string }[];
    selectedCategory: string[];
    selectedSubCategory: string[];
    selectedType: { value: string, label: string }[];
}
const Quiz = ({ 
       selectedTeam:team_id,
       selectedCategory:cate_id,
       selectedSubCategory:subcate_id,
       selectedType:type }: QuizProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [teamId, setTeamId] = useState("");
    const [userId, setUserId] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;
    const user = useSelector((state: RootState) => state.user.user);
    const { quizzes, totalPages, loading } = useSelector((state: RootState) => state.quiz);
    const { allSubCategory } = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getFilterCategory({status:null, teamId: team_id?.map((t: { value: string }) => t.value) || []}))
    }, [])

    useEffect(() => {
        dispatch(getAllSubCategories())
    }, [])

    useEffect(() => {
        if (user) {
            setTeamId(user.team_id);
            setUserId(user.employee_id);
        }
    }, [user])

    useEffect(() => {
        dispatch(getQuiz({
            page, 
            limit, 
            teamId: team_id?.map((t: { value: string }) => t.value) || [], 
            search: router.query.search, 
            type: type?.map((t: { value: string }) => t.value) || [], 
            category: cate_id || [], 
            subCategory: subcate_id || []
        }));
    }, [dispatch, page, team_id, cate_id, subcate_id, type]);

    const handleImportClick = (e: React.MouseEvent) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("teamId", teamId);
        formData.append("userId", userId);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'e-quiz/import', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                setMessage("File uploaded successfully!");
                dispatch(getQuiz({
                    page, 
                    limit, 
                    teamId: team_id?.map((t: { value: string }) => t.value) || [], 
                    search: router.query.search, 
                    type: type?.map((t: { value: string }) => t.value) || [], 
                    category: cate_id || [], 
                    subCategory: subcate_id || []
                }))
            } else {
                setMessage(response.data.message)
                dispatch(getQuiz({
                    page, 
                    limit, 
                    teamId: team_id?.map((t: { value: string }) => t.value) || [], 
                    search: router.query.search, 
                    type: type?.map((t: { value: string }) => t.value) || [], 
                    category: cate_id || [], 
                    subCategory: subcate_id || []
                }))
            }

        } catch (error) {
            dispatch(getQuiz({
                page, 
                limit, 
                teamId: team_id?.map((t: { value: string }) => t.value) || [], 
                search: router.query.search, 
                type: type?.map((t: { value: string }) => t.value) || [], 
                category: cate_id || [], 
                subCategory: subcate_id || []
            }))
            setMessage("Upload failed. Please try again.");
            console.error("Upload Error:", error);
        }

        setUploading(false);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 10000);

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [message]);

    const handleDeleteQuiz = (quizId: number) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            dispatch(deleteQuiz(quizId));
        }
    };

    const handleCreateQuiz = () => {
        dispatch(openModal({
          type: 'CREATE_QUIZ',
          props: { isEdit: false, editQuiz: null }
        }));
      };
      
      const handleEditQuiz = (quiz: any) => {
        dispatch(openModal({
          type: 'CREATE_QUIZ',
          props: { isEdit: true, editQuiz: quiz }
        }));
      };
      const handleViewQuiz=(quiz: any) => {
        dispatch(openModal({
          type: 'VIEW_QUIZ',
          props: { viewQuiz: quiz}
        }));
      };
      

    const handleDownload = async () => {
        try {
            const sheetCategoryData = [
                ['Category', 'Category Code', 'Category Definition', 'Sub Category', 'Sub Category Code', 'Sub Category Definition'],
                ...(allSubCategory || []).map((item: { cateName: string; cateCode: string; cateDetail: string; sub_category: string; sub_category_code: string; detail: string }) => [item.cateName, item.cateCode, item.cateDetail, item.sub_category, item.sub_category_code, item.detail])
            ];
            await downloadExcel({
                templateUrl: '/files/TemplateQuiz.xlsx',
                data: sheetCategoryData,
                sheetName: 'Category',
                exportFileName: 'QuizTemplate.xlsx',
                hasExpandSheet: true,
            });
        } catch (error) {
            console.error('Error in handleDownload:', error);
        }
    };

    const handleExport = async () => {
        try {
            const matchingQuizzes = quizzes.filter((item: { type: string }) => item.type === 'Matching Information');
            const otherQuizzes = quizzes.filter((item: { type: string }) => item.type !== 'Matching Information');

            const maxPairs = Math.max(
                ...matchingQuizzes.map((item: { answers: string; options: string }) => {
                    let answers = [];
                    let options = [];
                    try {
                        if (item.answers) answers = JSON.parse(item.answers);
                        if (item.options) options = JSON.parse(item.options);
                    } catch {}
                    return Math.max(answers.length, options.length);
                }),
                0
            );

            const maxOptions = Math.max(
                ...otherQuizzes.map((item: { options: string }) => {
                    if (item.options) {
                        try {
                            return JSON.parse(item.options).length;
                        } catch {
                            return 0;
                        }
                    }
                    return 0;
                }),
                0
            );

            // Prepare Matching Information sheet
            const matchingHeader = [
                'Category Code', 'Sub Category Code', 'Question', 'Question Image Link (If any)', 'Quiz Type',
                'Description', 'Correct Feedback', 'Correct URL', 'Incorrect Feedback', 'Incorrect URL',
                ...Array.from({ length: maxPairs }, (_, i) => [`Answer ${i + 1}`, `Option ${i + 1}`]).flat()
            ];
            const matchingSheet = [
                matchingHeader,
                ...matchingQuizzes.map((item: MatchingItem) => {
                    let answers = [];
                    let options = [];
                    try {
                        if (item.answers) answers = JSON.parse(item.answers);
                        if (item.options) options = JSON.parse(item.options);
                    } catch {}
                    while (answers.length < maxPairs) answers.push('');
                    while (options.length < maxPairs) options.push('');
                    let pairs = [];
                    for (let i = 0; i < maxPairs; i++) {
                        pairs.push(answers[i], options[i]);
                    }
                    return [
                        item.cate_code, item.sub_cate_code, item.question, item.question_image,
                        item.type, item.description,
                        item.correct_feedback, item.correct_url,
                        item.incorrect_feedback, item.incorrect_url,
                        ...pairs
                    ];
                })
            ];

            const otherHeader = [
                'Category Code', 'Sub Category Code', 'Question', 'Question Image Link (If any)', 'Quiz Type',
                'Description', 'Answer', 'Correct Feedback', 'Correct URL', 'Incorrect Feedback', 'Incorrect URL',
                ...Array.from({ length: maxOptions }, (_, i) => `Option ${i + 1}`)
            ];

            const otherSheet = [
                otherHeader,
                ...otherQuizzes.map(item => {
                    let options = [];
                    if (item.options) {
                        try {
                            options = JSON.parse(item.options);
                        } catch {
                            options = [];
                        }
                    }
                    while (options.length < maxOptions) options.push('');
                    return [
                        item.cate_code, item.sub_cate_code, item.question, item.question_image,
                        item.type, item.description,
                        (item.answers && item.type === 'Multiple Choice') ? JSON.parse(item.answers).join('; ') : item.answers,
                        item.correct_feedback, item.correct_url,
                        item.incorrect_feedback, item.incorrect_url,
                        ...options
                    ];
                })
            ];

            await exportExcel({
                data: [otherSheet, matchingSheet],
                exportFileName: 'Quizzes.xlsx',
            });
        } catch (error) {
            console.error('Error in handleDownload:', error);
        }
    };

    return (
        <>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                    <div className="section-title d-flex flex-wrap justify-content-between">
                        <div className="gap-3 d-flex flex-wrap">
                            <h4 className="rbt-title-style-3">Library Quiz</h4>
                        </div>
                        <div className="mt-3 mt-md-0">
                            <button
                                className="rbt-btn btn-border mr--5 hover-icon-reverse rbt-sm-btn"
                                type="button"
                                
                            >
                                <span className="icon-reverse-wrapper">
                                    <span className="btn-text">Quiz</span>
                                    <span className="btn-icon">
                                        <i className="feather-plus-square"></i>
                                    </span>
                                    <span className="btn-icon">
                                        <i className="feather-plus-square"></i>
                                    </span>
                                </span>
                            </button>
                            <button
                                className="mr--5 rbt-btn btn-border hover-icon-reverse rbt-sm-btn"
                                onClick={handleImportClick}
                                disabled={uploading}
                            >
                                <span className="icon-reverse-wrapper">
                                    <span className="btn-text">
                                        {uploading ? "Uploading..." : "Import Quiz"}
                                    </span>
                                    <span className="btn-icon">
                                        <i className="feather-download"></i>
                                    </span>
                                    <span className="btn-icon">
                                        <i className="feather-download"></i>
                                    </span>
                                </span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <a onClick={handleDownload} className="mr--5 rbt-btn btn-border rbt-sm-btn">Template</a>
                            <button
                                className="mr--5 rbt-btn btn-border rbt-sm-btn"
                                onClick={handleExport}
                                type="button"
                            >
                                Export
                            </button>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                    <hr />
                    <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
                        <p className="small">Total : {quizzes?.length} items</p>
                        <div className="rbt-dashboard-content-scroll">
                            <table className="rbt-table table table-borderless position-relative">
                                <thead className="position-sticky" style={{ top: 0 }}>
                                    <tr>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>Type</th>
                                        <th>Question</th>
                                        <th>Quiz ID</th>
                                        <th>Team</th>
                                        <th>Status</th>
                                        <th>Updated At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <QuizTableSkeleton />
                                ) : (
                                    <tbody>
                                        {quizzes && quizzes.length > 0 ? quizzes.map((quiz) => (
                                            <tr key={quiz.id}>
                                                <td width={'200px'}>
                                                    <span className="h6 mb--5">
                                                        {quiz.cate}
                                                    </span>
                                                    <p className="b3">
                                                        {quiz.cate_code}
                                                    </p>
                                                </td>
                                                <td width={'200px'}>
                                                    <span className="h6 mb--5">
                                                        {quiz.sub_cate}
                                                    </span>
                                                    <p className="b3">
                                                        {quiz.sub_cate_code}
                                                    </p>
                                                </td>
                                                <td>{quiz.type}</td>
                                                <td>{quiz.question}</td>
                                                <td>{quiz.quiz_id}</td>
                                                <td>{quiz.team_name}</td>
                                                <td className={quiz.status === 'Active' ? 'color-success' : 'color-danger'}>{quiz.status}</td>
                                                <td>{quiz.updated_at}</td>
                                                <td>
                                                    <div className="rbt-button-group justify-content-end">
                                                        <button
                                                            className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                                            title="Edit"
                                                            type="button"
                                                            onClick={() => handleEditQuiz(quiz)}
                                                        >
                                                            <i className="feather-edit pl--0" />
                                                        </button>
                                                        <button
                                                            className="rbt-btn btn-xs bg-warning-opacity radius-round"
                                                            title="View"
                                                            type="button"
                                                            onClick={() => handleViewQuiz(quiz)}
                                                        >
                                                            <i className="feather-eye pl--0" />
                                                        </button>
                                                        <a
                                                            className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                                            href="#"
                                                            title="Delete"
                                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                                        >
                                                            <i className="feather-trash-2 pl--0" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={9} className="text-center">No data</td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
                {totalPages && totalPages > 1 && (
                    <div className="row">
                        <div className="col-lg-12 mt--60">
                            <Pagination totalPages={totalPages} pageNumber={page} handleClick={(num: number) => setPage(num)} />
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Quiz;
