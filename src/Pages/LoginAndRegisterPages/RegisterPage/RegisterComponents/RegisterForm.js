import React from "react";
import FormInput from "../../MainComponents/FormInput";
import FormSubmissionBtn from "../../MainComponents/FormSubmission";

export default function RegisterForm() {
    return(
        <div>
            <form action="/" method="post" className="signin-form">
                <FormInput
                    InputFor="Username"
                    InputType="text"
                    placeHolder="Username"
                    content="Username"
                />
                <FormInput
                    InputFor="email"
                    InputType="email"
                    placeHolder="Emain"
                    content="Email"
                />
                <FormInput
                    InputFor="passwordOne"
                    InputType="text"
                    placeHolder="Password"
                    content="Password"
                />
                <FormInput
                    InputFor="passwordTwo"
                    InputType="text"
                    placeHolder="Password"
                    content="Password confirm"
                />
                <FormSubmissionBtn 
                    content="Sign up"
                    submitRule="signup"
									/>
            </form>
        </div>
    );
}