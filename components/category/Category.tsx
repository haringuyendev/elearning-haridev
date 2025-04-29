import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory, getCategory, getSubCategories} from "@/redux/action/CategoryAction";
import axios from "axios";
import Pagination from "@/components/common/Pagination";
import {useRouter} from "next/router";
import { AppDispatch, RootState } from "@/redux/store";
import CategoryTableSkeleton from "@/components/skeletons/CategoryTableSkeleton";
import { openModal } from "@/redux/reducer/ModalSlices";

const ECategory = ({editCategory, setEditCategory, setEditModalOpen, editModalOpen}:{
    editCategory: any;
    setEditCategory: (cate: any) => void;
    setEditModalOpen: (open: boolean) => void;
    editModalOpen: boolean;
}) => {
    const {
        categories,
        loading,
        error,
        totalPages,
        quizCount,
        subCategory,
        totalCate,
        dataCountSub
    } = useSelector((state: RootState) => state.category);
    const [message, setMessage] = useState("");
    const [teamId, setTeamId] = useState("");
    const [userId, setUserId] = useState("");
    const user = useSelector((state: RootState) => state.user.user);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState(1);
    const limit = 10; // Number of quizzes per page
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setTeamId(user.team_id);
            setUserId(user.employee_id);
        }
    }, [user])

    useEffect(() => {
        dispatch(getCategory({
            status: router.query.status,
            page,
            limit,
            teamId: router.query.teamId,
            category: router.query.category
        }));
    }, [dispatch, page, router.query]);

    const handleClick = (num: number) => {
        setPage(num);
        dispatch(getCategory({
            status: router.query.status,
            page: num,
            limit,
            teamId: router.query.teamId,
            category: router.query.category
        }));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleImportClick = (e: React.MouseEvent) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("teamId", teamId);
        formData.append("userId", userId);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'e-category/import', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage("File uploaded successfully!");

            dispatch(getCategory(null))
        } catch (error) {
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

    const handleCreateCategory = (cate: any) => {
        dispatch(openModal({type:'CATEGORY_EDIT', props:{isEdit:false, editCategory: null}}))
    };

    const handleEditCategory = (cate: any) => {
        dispatch(openModal({type:'CATEGORY_EDIT', props:{isEdit:true, editCategory: cate}}))
        dispatch(getSubCategories(cate.id));
    };

    const handleDeleteCategory = (cateId: number) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategory(cateId));
        }
    };

    return (
        <>
            <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
                <div className="content">
                    <div className="section-title d-flex flex-wrap justify-content-between">
                        <div className="gap-3 d-flex flex-wrap">
                            <h4 className="rbt-title-style-3">Categories</h4>
                        </div>

                        <div className="mt-3 mt-md-0">
                            <button
                                className="rbt-btn btn-border mr--5 hover-icon-reverse rbt-sm-btn"
                                type="button"
                                onClick={handleCreateCategory}
                            >
                              <span className="icon-reverse-wrapper">
                                <span className="btn-text">Category</span>
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
                                      {uploading ? "Uploading..." : "Import Category"}
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
                                style={{display: "none"}}
                                onChange={handleFileChange}
                            />
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                
                    <hr className="mt--30"/>

                    <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
                        <p className="small">Total : {totalCate} items</p>
                        <div className="rbt-dashboard-content-scroll">
                            <table className="rbt-table table table-borderless">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Category Code</th>
                                    <th>Category</th>
                                    <th>Definition</th>
                                    <th>Frequency of Category Usage</th>
                                    <th>Number of Sub Category</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                {loading ? (
                                    <CategoryTableSkeleton />
                                ):<tbody>
                                {categories && categories.length > 0 ? categories.map((cate, index) => (
                                    <>
                                        <tr
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#category${index}`}
                                            aria-expanded="false"
                                            aria-controls={`category${index}`}
                                        >
                                            <td>{index + 1}</td>
                                            <td>
                                                <span className="h6 mb--5">{cate.category_code}</span>
                                                <p className="b-4">{cate.team_name}</p>
                                            </td>
                                            <td width={'200px'}>
                                                <p className="b4 mb--5">{cate.updated_at}</p>
                                                <p className="b3">{cate.category}</p>
                                            </td>
                                            <td>{cate.detail}</td>
                                            <td>{'0'}</td>
                                            <td>{dataCountSub[cate.id] ?? '-'}</td>
                                            <td className={cate.status === 'Active' ? 'color-success' : 'color-danger'}>{cate.status}</td>
                                            <td>
                                                <div className="rbt-button-group justify-content-end">
                                                    <button
                                                        className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                                        title="Edit"
                                                        type="button"
                                                        
                                                        onClick={() => handleEditCategory(cate)}
                                                    >
                                                        <i className="feather-edit pl--0"/>
                                                    </button>
                                                    <a
                                                        className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                                        href="#"
                                                        title="Delete"
                                                        onClick={() => handleDeleteCategory(cate.id)}
                                                    >
                                                        <i className="feather-trash-2 pl--0"/>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr id={`category${index}`} className="accordion-collapse collapse"
                                            aria-labelledby={`subcate${index}`}>
                                            <td colSpan={8}>
                                                <table className="table table-borderless">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-black">No.</th>
                                                        <th className="text-black">Sub Category Code</th>
                                                        <th className="text-black">Sub Category</th>
                                                        <th className="text-black">Definition</th>
                                                        <th className="text-black">Frequency of Sub Category Usage</th>
                                                        <th className="text-black">Number of Question</th>
                                                        <th className="text-black">Status</th>
                                                        <th className="text-black">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {subCategory && subCategory[cate.id] && subCategory[cate.id].map((item: any, k: number) => (
                                                        <tr key={k}>
                                                            <td>{k + 1}</td>
                                                            <td>
                                                                <span
                                                                    className="h6 mb--5">{item.sub_category_code}</span>
                                                            </td>
                                                            <td width={'200px'}>
                                                                <p className="b4 mb--5">{item.updated_at}</p>
                                                                <p className="b3">{item.sub_category}</p>
                                                            </td>
                                                            <td>{item.detail}</td>
                                                            <td>{'0'}</td>
                                                            <td>
                                                                <Link
                                                                    href={`/pages/event-sidebar?subCategory=${item.id}`}
                                                                    target={'_blank'}>
                                                                    {quizCount[cate.id][item.id] ?? '-'}
                                                                </Link>
                                                            </td>
                                                            <td className={item.status === 'Active' ? 'color-success' : 'color-danger'}>{item.status}</td>
                                                            <td>
                                                                <div className="rbt-button-group justify-content-end">
                                                                    <button
                                                                        className="rbt-btn btn-xs bg-primary-opacity radius-round"
                                                                        title="Merge"
                                                                        type="button"
                                                                        
                                                                    >
                                                                        <i className="feather-refresh-ccw pl--0"/>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </>
                                )) : (
                                    <tr>
                                        <td colSpan={6}>No data</td>
                                    </tr>
                                )}
                                </tbody>}
                            </table>
                        </div>
                    </div>
                </div>

                {totalPages && totalPages > 1 && (
                    <div className="row">
                        <div className="col-lg-12 mt--60">
                            <Pagination totalPages={totalPages} pageNumber={page} handleClick={handleClick}/>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ECategory;
