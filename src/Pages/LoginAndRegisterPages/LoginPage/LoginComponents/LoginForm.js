import React from "react";
import FormInput from "../../MainComponents/FormInput";
import FormSubmissionBtn from "../../MainComponents/FormSubmission";
import RememberAndForget from "./RememberAndForget";
import { useState } from "react";

export default function LoginForm() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        passord: "",
        rememberMe: false
    })
    function handleEmailInput(e) {
        setUserInfo({...userInfo, email: e.target.value})
    }
    function handleUserPassword(e) {
        setUserInfo({...userInfo, passord: e.target.value})
    }
    function handleRememberMe(e) {
        setUserInfo({...userInfo, rememberMe: e.target.checked})
    }
    function handleFormSubmit(e) {
        e.preventDefault();
    }
    return(
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
                InputType="text"
                placeHolder="Password"
                content="Password"
                handler={handleUserPassword}
            />
            <RememberAndForget 
                checked={userInfo.rememberMe}
                handler={handleRememberMe}
            />
            <FormSubmissionBtn 
                content="Sign In"
                submitRule="signin"
            />
        </form>
    );
}