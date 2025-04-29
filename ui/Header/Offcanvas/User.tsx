import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutUser } from "@/redux/action/UserAction";
import { persistor, RootState } from "@/redux/store";
import { clearUser } from "@/redux/reducer/UserSlices";
import { AppDispatch } from "@/redux/store";

const User = () => {
    const router = useRouter();
    const user  = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();

    const [isMounted, setIsMounted] = useState(false); // State to track if component is mounted

    useEffect(() => {
        setIsMounted(true); // Set the mounted state to true after the component is mounted
    }, []);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user]);

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        
        if (logoutUser.fulfilled.match(result)) {
          dispatch(clearUser()); // reset redux user
          await persistor.purge(); // clear redux-persist
          router.push("/auth/login");
        }
      };
      

    if (!isMounted) return null; // Prevent rendering before the component is mounted
    if (!user) return null;

    return (
        <div className="rbt-user-menu-list-wrapper">
            {user &&
                <div className="inner">
                    <div className="rbt-admin-profile">
                        <div className="admin-info">
                            <span className="name">{user['fullname']}</span>
                            <Link className="rbt-btn-link color-primary" href="/instructor/instructor-profile">
                                View Profile
                            </Link>
                        </div>
                    </div>

                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                        <li>
                            <Link href="#">
                                <i className="feather-book-open"></i>
                                <span>Getting Started</span>
                            </Link>
                        </li>
                    </ul>

                    <hr className="mt--10 mb--10" />
                    <ul className="user-list-wrapper">
                        <li>
                            <Link href="/instructor/instructor-settings">
                                <i className="feather-settings"></i>
                                <span>Settings</span>
                            </Link>
                        </li>
                        <li>
                            <a href={'#'} onClick={handleLogout} className="logout-btn">
                                <i className="feather-log-out"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
};

export default User;
