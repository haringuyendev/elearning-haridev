import React, { useState, useEffect } from "react";

import EventData from "@/constants/instructor/events.json";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubCategories,
  getFilterCategory,
} from "@/redux/action/CategoryAction";
import Select, { MultiValue, SingleValue } from "react-select";
import { useRouter } from "next/router";
import { getAllTeams } from "@/redux/action/UserAction";
import { RootState, AppDispatch } from "@/redux/store";
interface CategorySidebarProps {
  selectedTeam: { value: string; label: string }[];
  setSelectedTeam: (value: { value: string; label: string }[]) => void;
  selectedCategory: string[];
  setSelectedCategory: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  selectedSubCategory: string[];
  setSelectedSubCategory: (
    value: string[] | ((prev: string[]) => string[])
  ) => void;
  selectedStatus: { value: string; label: string }[];
  setSelectedStatus: (value: { value: string; label: string }[]) => void;
  resetState: () => void;
}

const CategorySidebar = ({
  selectedTeam,
  setSelectedTeam,
  selectedCategory,
  resetState,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: CategorySidebarProps) => {
  const allTeams = useSelector((state: RootState) => state.user.allTeams);
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState(false);
  const allCategory = useSelector(
    (state: RootState) => state.category.allCategory
  );

  const sortByStatus = [
    { value: "", label: "Select..." },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const options = allTeams
    ? allTeams.map((item) => ({
        value: item.id,
        label: `${item.name} (${item.teamgroup})`,
      }))
    : [];

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    dispatch(
      getFilterCategory({
        status: selectedStatus.map((status) => status.value),
        teamId: selectedTeam.map((team) => team.value),
      })
    );
  }, [selectedTeam, selectedStatus, selectedCategory]);

  return (
    <>
      <aside className="rbt-sidebar-widget-wrapper-scroll">
        <div className="rbt-single-widget rbt-widget-recent">
          <div className="inner">
            <h4 className="rbt-widget-title">Status</h4>
            <div className="filter-select rbt-modern-select">
              <Select
                instanceId="sortBySelect"
                className="react-select max-width-auto"
                classNamePrefix="react-select"
                value={selectedStatus}
                onChange={(
                  selected: SingleValue<{ value: string; label: string }>
                ) => {
                  setSelectedStatus(selected ? [selected] : []);
                }}
                options={sortByStatus}
              />
            </div>
          </div>
        </div>
        <div className={`rbt-single-widget rbt-widget-categories`}>
          <div className="inner">
            <h4 className="rbt-widget-title">Teams</h4>
            <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
              <Select
                isMulti
                options={options}
                value={selectedTeam}
                onChange={(
                  selected: MultiValue<{ value: string; label: string }>
                ) => {
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
        <div
          className={`rbt-single-widget rbt-widget-categories has-show-more ${
            toggle ? "active" : ""
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
                        onChange={() =>
                          setSelectedCategory((prev: string[]) => {
                            if (prev.includes(String(data.id))) {
                              return prev.filter(
                                (id) => id !== String(data.id)
                              );
                            } else {
                              return [...prev, String(data.id)];
                            }
                          })
                        }
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
            {toggle ? "Show Less" : "Show More"}
          </div>
        </div>
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
        <div
          className="rbt-single-widget"
          onClick={resetState}
        >
          Clear
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;
