import {useRouter} from "next/router";
import SidebarData from "../../constants/instructor/siderbar.json";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { RootState } from "@/redux/store";

const InstructorDashboardSidebar = () => {
    const router = useRouter();
    const path = router.pathname;
    const [teamId, setTeamId] = useState("");
    const [managerTeam, setManagerTeam] = useState("");
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (user) {
            setTeamId(user.team_id);
            setManagerTeam(user.manage_team);
        }
    }, [user])

    return (
        <>
            <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
                <div className="inner">
                    <div className="content-item-content">
                        <div className="rbt-default-sidebar-wrapper">
                            <div className="section-title mb--20">
                                <h6 className="rbt-title-style-2">Welcome, Jone Due</h6>
                            </div>
                            <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list nav-tabs">
                                    {SidebarData &&
                                        SidebarData.siderbar.slice(0, 6).map((data, index) => (
                                            <li className="nav-item" key={index} role="presentation">
                                                <Link
                                                    className={`${path === data.link ? "active" : ""}`}
                                                    href={data.link}
                                                >
                                                    <i className={data.icon}/>
                                                    <span>{data.text}</span>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </nav>

                            <div className="section-title mt--40 mb--20">
                                <h6 className="rbt-title-style-2">Instructor</h6>
                            </div>

                            <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    {SidebarData &&
                                        SidebarData.siderbar.slice(6, 11).map((data, index) => {
                                                let link = data.link;
                                                if (data.text === 'Quiz Library of Team' || data.text === 'Category of Team') {
                                                    link = link + '?teamId=' + teamId + (managerTeam !== '' ? ',' + managerTeam : '')
                                                }
                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            href={link}
                                                            className={`${path === data.link ? "active" : ""}`}
                                                        >
                                                            <i className={data.icon}/>
                                                            <span>{data.text}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        )}
                                </ul>
                            </nav>

                            <div className="section-title mt--40 mb--20">
                                <h6 className="rbt-title-style-2">User</h6>
                            </div>

                            <nav className="mainmenu-nav">
                                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                                    {SidebarData &&
                                        SidebarData.siderbar.slice(11, 13).map((data, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            href={data.link}
                                                            className={`${path === data.link ? "active" : ""}`}
                                                        >
                                                            <i className={data.icon}/>
                                                            <span>{data.text}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstructorDashboardSidebar;
