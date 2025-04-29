import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/action/UserAction"; // Import login action
import { AppDispatch } from '@/redux/store';

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error messages

        const result = await dispatch(loginUser({ username, password }));

        if (result.payload) {
            console.log("Login result:", result);
            router.push("/");
        } else {    
            setErrorMessage(result.payload.message);
        }
    };

    return (
        <div className="col-lg-6">
            <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <h3 className="title">Login</h3>

                {/* Display error message if login fails */}
                {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}

                <form className="max-width-auto" onSubmit={submitLogin}>
                    <div className="form-group">
                        <input
                            name="con_name"
                            type="text"
                            placeholder="Username or email *"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span className="focus-border"></span>
                    </div>
                    <div className="form-group">
                        <input
                            name="con_email"
                            type="password"
                            placeholder="Password *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="focus-border"></span>
                    </div>

                    <div className="form-submit-group">
                        <button type="submit" className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100">
                            <span className="icon-reverse-wrapper">
                                <span className="btn-text">Log In</span>
                                <span className="btn-icon">
                                    <i className="feather-arrow-right"></i>
                                </span>
                                <span className="btn-icon">
                                    <i className="feather-arrow-right"></i>
                                </span>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
