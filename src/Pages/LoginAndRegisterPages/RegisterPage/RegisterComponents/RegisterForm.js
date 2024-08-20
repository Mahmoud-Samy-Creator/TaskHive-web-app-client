import React from "react";
import FormInput from "../../MainComponents/FormInput";
import FormSubmissionBtn from "../../MainComponents/FormSubmission";
import { useState } from "react";

const submitFailed = {
    textAlign: "center",
    background: "#f63a3a",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    padding: "10px 0"
}
const submitSuccess = {
    textAlign: "center",
    background: "#11cab6",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    padding: "10px 0"
}
export default function RegisterForm() {
    const [userRegistationInfo, setUserRegistationInfo] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    const [submiteMessage, setSubmiteMessage] = useState(null);
    function handleUsername(e) {
        setUserRegistationInfo({...userRegistationInfo, username: e.target.value})
    }
    function handleUserEmail(e) {
        setUserRegistationInfo({...userRegistationInfo, email: e.target.value})
    }
    function handleUserPass(e) {
        setUserRegistationInfo({...userRegistationInfo, password: e.target.value})
    }
    function handleUserPassConfirm(e) {
        setUserRegistationInfo({...userRegistationInfo, passwordConfirmation: e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault();
        userRegistationInfo.password === userRegistationInfo.passwordConfirmation ? 
        setSubmiteMessage(true) : setSubmiteMessage(false); 
    }
    return(
        <div>
            <form action="/" method="post" className="signin-form" onSubmit={handleSubmit}>
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
                    placeHolder="Emain"
                    content="Email"
                    handler={handleUserEmail}
                />
                <FormInput
                    InputFor="passwordOne"
                    InputType="text"
                    placeHolder="Password"
                    content="Password"
                    handler={handleUserPass}
                />
                <FormInput
                    InputFor="passwordTwo"
                    InputType="text"
                    placeHolder="Password"
                    content="Password confirm"
                    handler={handleUserPassConfirm}
                />
                <FormSubmissionBtn 
                    content="Sign up"
                    submitRule="signup"
                />
            </form>
            {submiteMessage === null ? <></> : submiteMessage === false ?
                <div style={submitFailed}>Passwords are not the same</div> : <div style={submitSuccess}>Submitted: Check your email</div>
            }
        </div>
    );
}