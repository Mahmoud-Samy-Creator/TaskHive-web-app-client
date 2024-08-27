import React from "react";
import FormHeader from "../MainComponents/FormHeader";
import SignupLoginRef from "../MainComponents/SignupLoginRef";
import FormInput from "../MainComponents/FormInput";
import FormSubmissionBtn from "../MainComponents/FormSubmission";

export default function ForgetPassword() {
    return(
        <section className="ftco-section">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12 col-lg-10">
						<div className="wrap d-md-flex">
							<div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
								<SignupLoginRef
									headerContent="Enter your email"
									statment="You already have an account?"
									hyperLink="/auth/login"
									linkContent="login"
								/>
							</div>
							<div className="login-wrap p-4 p-lg-5">
								<FormHeader 
									headerContent="Forgot password?"
									// rule=""
								/>
								<form action="/" method="post" className="signin-form">
                                    <FormInput
                                        InputFor="email"
                                        InputType="email"
                                        placeHolder="Emain"
                                        content="Email"
                                    />
									<FormSubmissionBtn 
										content="Send reset email"
										submitRule="resetPassword"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}