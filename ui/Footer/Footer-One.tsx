import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo/logo.png";

import CopyRight from "./CopyRight";

import FooterData from "../../constants/footer.json";
import SingleFooter from "./FooterProps/SingleFooter";

const FooterOne = ({ bgColor }: { bgColor?: string }) => {
  return (
    <>
      <footer
        className={`rbt-footer footer-style-1 ${
          bgColor ? bgColor : "bg-color-white"
        } overflow-hidden`}
      >
        <div className="footer-top">
          <div className="container">
            {FooterData &&
              FooterData.footerTwo.map((footer, index) => (
                <div className="row g-5" key={index}>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="footer-widget">
                      <div className="logo">
                        <Link href="/">
                          <Image
                            src={logo}
                            width={152}
                            height={50}
                            alt="Edu-cause"
                          />
                        </Link>
                      </div>

                      <p className="description mt--20">{footer.description}</p>

                      <ul className="social-icon social-default justify-content-start">
                        {footer.socialLink.map((value, innerIndex) => (
                          <li key={innerIndex}>
                            <Link href={value.link}>
                              <i className={value.icon}></i>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <div className="contact-btn mt--30">
                        <Link
                          className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                          href="#"
                        >
                          <div className="icon-reverse-wrapper">
                            <span className="btn-text">Contact With Us</span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <SingleFooter
                    classOne="col-lg-2 col-md-6 col-sm-6 col-12 mt--30"
                    title="Useful Links"
                    footerType={footer.usefulLinks}
                  />
                  <SingleFooter
                    classOne="col-lg-2 col-md-6 col-sm-6 col-12"
                    title="Our Company"
                    footerType={footer.ourCompany}
                  />

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="footer-widget">
                      <h5 className="ft-title">Get Contact</h5>
                      <ul className="ft-link">
                        <li>
                          <span>Phone: </span>
                          <Link href="#">{footer.phone}</Link>
                        </li>
                        <li>
                          <span>E-mail:</span>{" "}
                          <Link href="mailto:hr@example.com">
                            {footer.mail}
                          </Link>
                        </li>
                      </ul>

                      <form className="newsletter-form mt--20" action="#">
                        <h6 className="w-600">Newsletter</h6>
                        <p className="description">{footer.descriptionTwo}</p>

                        <div className="form-group right-icon icon-email mb--20">
                          {/* <label htmlFor="email">Enter Your Email Here</label> */}
                          <input
                            id="email"
                            type="email"
                            placeholder="Enter Your Email Here"
                          />
                        </div>

                        <div className="form-group mb--0">
                          <button
                            className="rbt-btn rbt-switch-btn btn-gradient radius-round btn-sm"
                            type="submit"
                          >
                            <span data-text="Submit Now">Submit Now</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <CopyRight />
      </footer>
    </>
  );
};

export default FooterOne;
