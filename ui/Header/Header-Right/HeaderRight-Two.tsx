import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import User from "../Offcanvas/User";
import { RootState } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { setSearch } from "@/redux/reducer/UiSlices";
import { setMobile } from "@/redux/reducer/UiSlices";

const HeaderRightTwo = ({ btnClass, btnText, userType }:{btnClass:string, btnText:string, userType:string}) => {
  const { mobile, search, cartToggle } = useSelector((state: RootState) => state.ui);
  const dispatch= useDispatch<AppDispatch>();
  const total_items = useSelector((state: RootState) => state.cart.total_items);

  return (
    <div className="header-right">
      <ul className="quick-access">
        <li className="access-icon">
          <Link
            className={`search-trigger-active rbt-round-btn ${
              search ? "" : "open"
            }`}
            href="#"
            onClick={() => dispatch(setSearch(!search))}
          >
            <i className="feather-search"></i>
          </Link>
        </li>

        {/*<li className="access-icon rbt-mini-cart">*/}
        {/*  <Link*/}
        {/*    className="rbt-cart-sidenav-activation rbt-round-btn"*/}
        {/*    href="#"*/}
        {/*    onClick={() => setCart(!cartToggle)}*/}
        {/*  >*/}
        {/*    <i className="feather-shopping-cart"></i>*/}
        {/*    <span className="rbt-cart-count">{total_items}</span>*/}
        {/*  </Link>*/}
        {/*</li>*/}

        <li className="account-access rbt-user-wrapper d-none d-xl-block">
          <Link href="#">
            <i className="feather-user"></i>
            {userType}
          </Link>
          <User />
        </li>

        <li className="access-icon rbt-user-wrapper d-block d-xl-none">
          <Link className="rbt-round-btn" href="#">
            <i className="feather-user"></i>
          </Link>
          <User />
        </li>
      </ul>

      {/*<div className="rbt-btn-wrapper d-none d-xl-block">*/}
      {/*  <Link className={`rbt-btn ${btnClass}`} href="#">*/}
      {/*    <span data-text={`${btnText}`}>{btnText}</span>*/}
      {/*  </Link>*/}
      {/*</div>*/}

      <div className="mobile-menu-bar d-block d-xl-none">
        <div className="hamberger">
          <button
            className="hamberger-button rbt-round-btn"
            onClick={() => dispatch(setMobile(!mobile))}
          >
            <i className="feather-menu"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderRightTwo;
