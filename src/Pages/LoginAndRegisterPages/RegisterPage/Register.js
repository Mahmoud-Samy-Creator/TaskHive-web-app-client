import React from "react";
import SignupLoginRef from "../MainComponents/SignupLoginRef";
import FormHeader from "../MainComponents/FormHeader";
import RegisterForm from "./RegisterComponents/RegisterForm";
import '../style/style.css';

export default function Register() {
    return(
        <section className="ftco-section">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12 col-lg-10">
						<div className="wrap d-md-flex">
							<div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
								<SignupLoginRef
									headerContent="Welcome to registration"
									statment="You already have an account?"
									hyperLink="/login"
									linkContent="login"
								/>
							</div>
							<div className="login-wrap p-4 p-lg-5">
								<FormHeader 
									headerContent="Sign Up"
									rule="register"
								/>
								<RegisterForm />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}