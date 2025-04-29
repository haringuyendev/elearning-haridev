import React, { useState, useEffect } from "react";

import EventData from "@/constants/instructor/events.json";
import { useDispatch, useSelector } from "react-redux";
import { getFilterCategory, getSubCategories } from "@/redux/action/CategoryAction";
import Select, { MultiValue, SingleValue } from "react-select";
import { getAllTeams } from "@/redux/action/UserAction";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";


interface QuizSidebarProps {
    selectedTeam: { value: string, label: string }[];
    setSelectedTeam: (value: { value: string, label: string }[]) => void;
    selectedCategory: string[];
    setSelectedCategory: (value: string[] | ((prev: string[]) => string[])) => void;
    selectedSubCategory: string[];
    setSelectedSubCategory: (value: string[] | ((prev: string[]) => string[])) => void;
    selectedType: { value: string, label: string }[];
    setSelectedType: (value: { value: string, label: string }[]) => void;
    resetState: () => void;
}

const QuizSidebar = ({ selectedTeam,
    setSelectedTeam,
    selectedCategory,
    resetState,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedType,
    setSelectedType }: QuizSidebarProps) => {
    const [toggle, setToggle] = useState(false);
    const [toggleSub, setToggleSub] = useState(false);

    const allCategory = useSelector((state: RootState) => state.category.allCategory);
    const allSubCategory = useSelector((state: RootState) => state.category.subCateFetch);
    const quizCountSub = useSelector((state: RootState) => state.category.quizCountSub);
    const allTeams = useSelector((state: RootState) => state.user.allTeams);
    const dispatch = useDispatch<AppDispatch>();

    const sortByType = [
        { value: "", label: "Select..." },
        { value: "Single Choice", label: "Single Choice" },
        { value: "Multiple Choice", label: "Multiple Choice" },
        { value: "True/False", label: "True/False" },
        { value: "Text Answer", label: "Text Answer" },
        { value: "Matching Information", label: "Matching Information" },
    ];
    useEffect(() => {
        dispatch(getFilterCategory({ status: null, teamId: selectedTeam.map(team => team.value) }))
    }, [selectedTeam])

    useEffect(() => {
        const categoryIds = selectedCategory.filter(id => id !== '').join(',');
        dispatch(getSubCategories({ cateId: categoryIds || null }))
    }, [selectedCategory])

    useEffect(() => {
        dispatch(getAllTeams())
    }, [])

    const options = allTeams ? allTeams.map(item => ({
        value: item.id,
        label: `${item.name} (${item.teamgroup})`
    })) : [];


    const TeamSection = () => (
        <div className={`rbt-single-widget rbt-widget-categories`}>
            <div className="inner">
                <h4 className="rbt-widget-title">Teams</h4>
                <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                    <Select
                        isMulti
                        options={options}
                        value={selectedTeam}
                        onChange={(selected: MultiValue<{ value: string; label: string }>) => {
                            if (!selected) {
                                setSelectedTeam([]);
                                return;
                            }
                            setSelectedTeam([...selected]);
                        }}
                    />
                </div>
            </div>
        </div>
    )
    const CategorySection = () => (
        <div
            className={`rbt-single-widget rbt-widget-categories has-show-more ${toggle ? "active" : ""
                }`}
        >
            <div className="inner">
                <h4 className="rbt-widget-title">Categories</h4>
                <ul className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content">
                    {allCategory &&
                        allCategory.map((data: any, index: number) => {
                            const isChecked = selectedCategory.includes(String(data.id));
                            return (
                                <li className="rbt-check-group" key={index}>
                                    <input
                                        id={`cat-list-${index + 1}`}
                                        type="checkbox"
                                        name={`cat-list-${index + 1}`}
                                        checked={isChecked}
                                        onChange={() => setSelectedCategory((prev: string[]) => {
                                            if (prev.includes(String(data.id))) {
                                                return prev.filter(id => id !== String(data.id));
                                            } else {
                                                return [...prev, String(data.id)];
                                            }
                                        })}
                                    />
                                    <label htmlFor={`cat-list-${index + 1}`}>
                                        {data.category} ({data.category_code})
                                    </label>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div
                className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
                onClick={() => setToggle(!toggle)}
            >
                {toggle ? 'Show Less' : 'Show More'}
            </div>
        </div>
    )
    const SubCategorySection = () => (
        <div
            className={`rbt-single-widget rbt-widget-categories has-show-more ${toggleSub ? "active" : ""
                }`}
        >
            <div className="inner">
                <h4 className="rbt-widget-title">Sub Categories</h4>
                <ul className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content">
                    {allSubCategory &&
                        allSubCategory.map((data: any, index: number) => {
                            const isChecked = selectedSubCategory.includes(String(data.id));

                            return (
                                <li className="rbt-check-group" key={index}>
                                    <input
                                        id={`sub-list-${index + 1}`}
                                        type="checkbox"
                                        name={`sub-list-${index + 1}`}
                                        checked={isChecked}
                                        onChange={() => setSelectedSubCategory((prev: string[]) => {
                                            if (prev.includes(String(data.id))) {
                                                return prev.filter(id => id !== String(data.id));
                                            } else {
                                                return [...prev, String(data.id)];
                                            }
                                        })}
                                    />
                                    <label htmlFor={`sub-list-${index + 1}`}>
                                        {data.sub_category} ({data.sub_category_code})
                                        <span
                                            className="rbt-lable count">{quizCountSub && quizCountSub[data.id]}</span>
                                    </label>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div
                className={`rbt-show-more-btn ${toggleSub ? "active" : ""}`}
                onClick={() => setToggleSub(!toggleSub)}
            >
                {toggleSub ? 'Show Less' : 'Show More'}
            </div>
        </div>
    )
    const TypeSection = () => (
        <div className="rbt-single-widget rbt-widget-recent">
            <div className="inner">
                <h4 className="rbt-widget-title">Type</h4>
                <div className="filter-select rbt-modern-select">
                    <Select
                        instanceId="sortBySelect"
                        className="react-select max-width-auto"
                        classNamePrefix="react-select"
                        value={selectedType}
                        onChange={(selected: SingleValue<{ value: string; label: string }>) => {
                            setSelectedType(selected ? [selected] : []);
                        }}
                        options={sortByType}
                    />
                </div>
            </div>
        </div>
    )
    const TagSection = () => (
        <div className="rbt-single-widget rbt-widget-tag">
            <div className="inner">
                <h4 className="rbt-widget-title">Event Tags</h4>
                <div className="rbt-sidebar-list-wrapper rbt-tag-list">
                    {EventData &&
                        EventData.events.map((data, index) => (
                            <Link key={index} href="#">
                                {data.tag}
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
    return (
        <>
            <aside className="rbt-sidebar-widget-wrapper-scroll">
                <TeamSection />
                <CategorySection />
                <SubCategorySection />
                <TypeSection />
                <TagSection />
                <div className="rbt-single-widget" onClick={resetState}>
                    Clear
                </div>
            </aside>
        </>
    );
};

export default QuizSidebar;
