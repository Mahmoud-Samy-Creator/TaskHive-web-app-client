import React, { useState } from "react";
import FormInput from "../../MainComponents/FormInput";
import FormSubmissionBtn from "../../MainComponents/FormSubmission";
import RememberAndForget from "./RememberAndForget";
import axios from "axios";

// API Login request
const apiURL = 'http://localhost:5000/auth/login';

// Component styling
const submitFailedStyle = {
    textAlign: "center",
    background: "#f63a3a",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    padding: "10px 0"
};

const submitSuccessStyle = {
    textAlign: "center",
    background: "#11cab6",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    padding: "10px 0"
};

// Login form components
export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [submiteMessage, setSubmiteMessage] = useState(null);

    function handleEmailInput(e) {
        setUserInfo({ ...userInfo, email: e.target.value });
    }

    function handleUserPassword(e) {
        setUserInfo({ ...userInfo, password: e.target.value });
    }

    function handleRememberMe(e) {
        setUserInfo({ ...userInfo, rememberMe: e.target.checked });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const data = {
            "email": userInfo.email,
            "password": userInfo.password
        };
        loginReq(data);
    }

    function handleErrors(err) {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    setSubmiteMessage({ success: false, message: "Invalid login" });
                    break;
                case 401:
                    setSubmiteMessage({ success: false, message: "Invalid email or password" });
                    break;
                case 500:
                    setSubmiteMessage({ success: false, message: "Server error" });
                    break;
                default:
                    setSubmiteMessage({ success: false, message: "Unexpected error: " + err.response.status });
                    break;
            }
        } else {
            setSubmiteMessage({ success: false, message: "Network error: " + err.message });
        }
    }

    function loginReq(data) {
        axios.post(apiURL, data)
            .then(res => {
                if (res.status === 200) {
                    setSubmiteMessage({ success: true, message: "Login successful" });
                    userInfo.rememberMe ? localStorage.setItem('authToken', res.data.token) : sessionStorage.setItem('authToken', res.data.token);
                    logInSucc()
                }
            })
            .catch(handleErrors);
    }

    function logInSucc() {
        setTimeout(() => {
            document.location.reload();
        }, 2000);
    }

    return (
        <>
            <form action="/" method="post" className="signin-form" onSubmit={handleFormSubmit}>
                <FormInput
                    InputFor="email"
                    InputType="email"
                    placeHolder="Email"
                    content="Email"
                    handler={handleEmailInput}
                />
                <FormInput
                    InputFor="password"
                    InputType="password"
                    placeHolder="Password"
                    content="Password"
                    handler={handleUserPassword}
                />
                <RememberAndForget 
                    handler={handleRememberMe}
                />
                <FormSubmissionBtn 
                    content="Sign In"
                    submitRule="signin"
                />
            </form>
            {submiteMessage && (
                <div style={submiteMessage.success ? submitSuccessStyle : submitFailedStyle}>
                    {submiteMessage.message}
                </div>
            )}
        </>
    );
}
