import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import {useEffect, useState} from "react";

import MenuData from "../../constants/MegaMenu.json";

import CourseLayout from "./NavProps/CourseLayout";
import {useSelector} from "react-redux";
import { RootState } from "@/redux/store";

const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const router = useRouter();
  const [teamId, setTeamId] = useState("");
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      setTeamId(user.team_id);
    }
  }, [user])

  const isActive = (href: string) => router.pathname.startsWith(href);

  const toggleMenuItem = (item: string) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="#"
          >
            Home
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu menu-skin-dark ${
              activeMenuItem === "home" ? "active d-block" : ""
            }`}
          >
            
          </div>
        </li>

        <li className="with-megamenu has-menu-child-item">
          <Link
            className={`${activeMenuItem === "courses" ? "open" : ""}`}
            href="#"
            onClick={() => toggleMenuItem("courses")}
          >
            Courses
            <i className="feather-chevron-down"></i>
          </Link>

          <div
            className={`rbt-megamenu grid-item-2 ${
              activeMenuItem === "courses" ? "active d-block" : ""
            }`}
          >
            <div className="wrapper">
             
              <div className="row row--15">
                <CourseLayout
                  courseTitle="Course Layout"
                  MenuData={MenuData}
                  type="grid-item-2"
                  courseType={true}
                  num={2}
                />
                <CourseLayout
                  courseTitle="Course Layout"
                  MenuData={MenuData}
                  type="grid-item-2"
                  courseType={false}
                  num={1}
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
