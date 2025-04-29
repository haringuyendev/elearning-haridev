import React, {useEffect, useState} from "react";

const SubCategory = ({ subCategory, setSubCategory }: { subCategory: any; setSubCategory: any }) => {

    useEffect(() => {
        console.log(subCategory); // This will log the updated subCategory whenever it changes
    }, [subCategory]);

    const handleAddSubcategory = () => {
        setSubCategory([
            ...subCategory,
            { name: "", detail: "", status: "Active" }
        ]);
    };

    const handleDeleteSubcategory = (index: number) => {
        const updatedSubcategories = subCategory.filter((_ : any, i: number) => i !== index);
        setSubCategory(updatedSubcategories);
    };

    const handleSubcategoryChange = (index: number, field: string, value: string) => {
        const updatedSubcategories = [...subCategory];
        updatedSubcategories[index][field] = value;
        setSubCategory(updatedSubcategories);
    };

    return (
        <>
            <div className="course-field mb--20">
                <label htmlFor="subcategory">Subcategories</label>
                {subCategory.map((sub: any, index: number) => (
                    <div key={index} className="d-flex flex-column mb--20">
                        <div className="d-flex mb--10">
                            {/* Subcategory Name */}
                            <input
                                type="text"
                                placeholder={`Subcategory ${index + 1} Name`}
                                value={sub.name ?? sub.sub_category}
                                onChange={(e) => handleSubcategoryChange(index, "name", e.target.value)}
                                className="mr-2"
                            />
                            {/* Delete Button */}
                            <button
                                onClick={() => handleDeleteSubcategory(index)}
                                className="rbt-btn rbt-sm-btn mt--5 ml--20 feather-trash-2"
                            ></button>
                        </div>
                        <div className="d-flex mb--10">
                            {/* Subcategory Detail */}
                            <input
                                type="text"
                                placeholder={`Subcategory ${index + 1} Detail`}
                                value={sub.detail}
                                onChange={(e) => handleSubcategoryChange(index, "detail", e.target.value)}
                                className="mr-2"
                            />
                        </div>
                        <div className="d-flex mb--10">
                            {/* Subcategory Status */}
                            <select
                                value={sub.status}
                                onChange={(e) => handleSubcategoryChange(index, "status", e.target.value)}
                                className="mr-2"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                ))}
                {/* Add Subcategory Button */}
                <button className="rbt-btn rbt-sm-btn feather-plus" onClick={handleAddSubcategory}>Add Subcategory</button>
            </div>
        </>
    );
};

export default SubCategory;