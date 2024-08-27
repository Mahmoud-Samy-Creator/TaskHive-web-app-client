import React, { useState } from "react";
import FormInput from "../../MainComponents/FormInput";
import FormSubmissionBtn from "../../MainComponents/FormSubmission";
import axios from "axios";

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

export default function RegisterForm() {
    const [userRegistationInfo, setUserRegistationInfo] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    const [submiteMessage, setSubmiteMessage] = useState(null);

    function handleUsername(e) {
        setUserRegistationInfo({ ...userRegistationInfo, username: e.target.value });
    }

    function handleUserEmail(e) {
        setUserRegistationInfo({ ...userRegistationInfo, email: e.target.value });
    }

    function handleUserPass(e) {
        setUserRegistationInfo({ ...userRegistationInfo, password: e.target.value });
    }

    function handleUserPassConfirm(e) {
        setUserRegistationInfo({ ...userRegistationInfo, passwordConfirmation: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (userRegistationInfo.password === userRegistationInfo.passwordConfirmation) {
            if (userRegistationInfo.password.length >= 8) {
                const data = {
                    "username": userRegistationInfo.username,
                    "email": userRegistationInfo.email,
                    "password": userRegistationInfo.password
                };
                console.log(data);
                regPostRequest(data);
            } else {
                setSubmiteMessage({ success: false, message: "Password must be more than 8 characters or more" });
            }
        } else {
            setSubmiteMessage({ success: false, message: "Passwords do not match" });
        }
    }

    function regPostRequest(data) {
        axios.post('http://localhost:5000/auth/register', data)
            .then(res => {
                if (res.status === 201) {
                    setSubmiteMessage({ success: true, message: "Submitted: Check your email" });
                }
            })
            .catch(err => {
                console.log(err);
                handleErrors(err);
            });
    }

    function handleErrors(err) {
        if (err.response) {
            switch (err.response.status) {
                case 400:
                    setSubmiteMessage({ success: false, message: "Email already exists" });
                    break;
                case 500:
                    setSubmiteMessage({ success: false, message: "Failed to create user" });
                    break;
                default:
                    setSubmiteMessage({ success: false, message: "Unexpected error: " + err.response.status });
                    break;
            }
        } else {
            setSubmiteMessage({ success: false, message: "Network error: " + err.message });
        }
    }

    return (
        <>
            <form className="signin-form" onSubmit={handleSubmit}>
                <FormInput
                    InputFor="Username"
                    InputType="text"
                    placeHolder="Username"
                    content="Username"
                    handler={handleUsername}
                />
                <FormInput
                    InputFor="email"
                    InputType="email"
                    placeHolder="Email"
                    content="Email"
                    handler={handleUserEmail}
                />
                <FormInput
                    InputFor="passwordOne"
                    InputType="password"
                    placeHolder="Password"
                    content="Password"
                    handler={handleUserPass}
                />
                <FormInput
                    InputFor="passwordTwo"
                    InputType="password"
                    placeHolder="Password confirm"
                    content="Password confirm"
                    handler={handleUserPassConfirm}
                />
                <FormSubmissionBtn
                    content="Sign up"
                    submitRule="signup"
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
