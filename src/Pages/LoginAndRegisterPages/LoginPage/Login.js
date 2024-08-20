import React from "react";
import SignupLoginRef from "../MainComponents/SignupLoginRef";
import FormHeader from "../MainComponents/FormHeader";
import LoginForm from "./LoginComponents/LoginForm";
import '../style/style.css';

export default function Login() {
    return(
        <section className="ftco-section">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-10">
						<div className="wrap d-md-flex card">
							<div className="text-wrap p-4 text-center d-flex align-items-center order-md-last">
								<SignupLoginRef
									headerContent="Welcome to login"
									statment="Don't have an account?"
									hyperLink="/auth/register"
									linkContent="Sign Up"
								/>
							</div>
							<div className="login-wrap p-4 p-lg-5">
								<FormHeader 
									headerContent="Sign In"
									rule="login"
								/>
								<LoginForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}