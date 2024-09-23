import React from "react";
import Checkbox from '@mui/material/Checkbox';

export default function RememberAndForget({checked, handler}) {
    return(
        <div className="form-group d-md-flex" style={{display: "flex"}}>
            <div className="text-left" style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "start"}}>
                <div className="remember-me">
                    <Checkbox id="rememberMe" onChange={(e) => {handler(e)}}  />
                    <label htmlFor="rememberMe" style={{cursor: "pointer"}}>Remember Me</label>
                </div>
            </div>
            <div className="text-md-right" style={{width: "50%", display: "flex", alignItems: "center", justifyContent: "end"}}>
                <a href="/forget-password">Forgot Password</a>
            </div>
        </div>
    );
}