import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createCategory, updateCategory } from "@/redux/action/CategoryAction";
import { AppDispatch, RootState } from "@/redux/store";
import SubCategory from "@/components/category/SubCategory";

const CategoryModal = ({ isEdit, editCategory, onClose }: { isEdit: boolean; editCategory: any; onClose: () => void }) => {
    const [category, setCategory] = useState('');
    const [detail, setDetail] = useState('');
    const [teamId, setTeamId] = useState('');
    const [status, setStatus] = useState('Active');
    const [subCategory, setSubCategory] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState("");

    const user = useSelector((state: RootState) => state.user.user);
    const subCategories = useSelector((state: RootState) => state.category.subCateFetch);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserId(user.employee_id);
            setTeamId(user.team_id);
        }
    }, [user]);

    useEffect(() => {
        if (isEdit && editCategory) {
            setCategory(editCategory.category ?? '');
            setDetail(editCategory.detail ?? '');
            setStatus(editCategory.status ?? 'Active');
            setSubCategory(subCategories || []);
        } else {
            // Nếu tạo mới thì reset form
            setCategory('');
            setDetail('');
            setStatus('Active');
            setSubCategory([]);
            setErrorMessage('');
        }
    }, [isEdit, editCategory, subCategories]);

    const validateForm = () => {
        if (!category.trim() || !detail.trim() || !status.trim()) {
            setErrorMessage("Please fill all required fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateForm()) return;

        if (isEdit) {
            const result = await dispatch(updateCategory({
                id: editCategory.id,
                category,
                detail,
                status,
                subCategory,
                teamId,
                userId
            }));

            if (result.payload.success) {
                onClose();
                router.reload();
            } else {
                setErrorMessage(result.payload.message);
            }
        } else {
            const result = await dispatch(createCategory({
                category,
                detail,
                status,
                subCategory,
                teamId,
                userId
            }));

            if (result.payload.success) {
                onClose();
                setCategory('');
                setDetail('');
                setStatus('Active');
                setSubCategory([]);
                setErrorMessage('');
            } else {
                setErrorMessage(result.payload.message);
            }
        }
    };

    return (
        <div className="rbt-default-modal modal fade" id="modalCategory" tabIndex={-1} aria-labelledby="CategoryLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <button type="button" className="rbt-round-btn" data-bs-dismiss="modal" aria-label="Close">
                                <i className="feather-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="inner rbt-default-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h5 className="modal-title mb--20" id="CategoryLabel">
                                            {isEdit ? "Edit Category" : "Add Category"}
                                        </h5>

                                        <div className="course-field mb--15">
                                            <label htmlFor="category">Category Name</label>
                                            <input
                                                type="text"
                                                id="category"
                                                className="form-control"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Enter Category Name"
                                                required
                                            />
                                        </div>

                                        <div className="course-field mb--15">
                                            <label htmlFor="detail">Detail</label>
                                            <textarea
                                                id="detail"
                                                className="form-control"
                                                value={detail}
                                                onChange={(e) => setDetail(e.target.value)}
                                                placeholder="Enter Detail"
                                                rows={4}
                                                required
                                            />
                                        </div>

                                        <div className="course-field mb--15">
                                            <h6>Status</h6>
                                            <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                                                <select
                                                    className="w-100"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </div>

                                        <SubCategory subCategory={subCategory} setSubCategory={setSubCategory} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-circle-shape"></div>

                        {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}

                        <div className="modal-footer pt--30 justify-content-between">
                            <div className="form-submit-group">
                                <button type="submit" className="rbt-btn btn-md btn-gradient hover-icon-reverse w-30">
                                    <span className="icon-reverse-wrapper">
                                        <span className="btn-text">Save</span>
                                        <span className="btn-icon">
                                            <i className="feather-arrow-right"></i>
                                        </span>
                                        <span className="btn-icon">
                                            <i className="feather-arrow-right"></i>
                                        </span>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-footer pt--30">
                                <button
                                    type="button"
                                    className="rbt-btn btn-border btn-md radius-round-10"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
