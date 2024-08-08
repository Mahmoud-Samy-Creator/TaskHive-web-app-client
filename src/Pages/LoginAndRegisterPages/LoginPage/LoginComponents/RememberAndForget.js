import React from "react";

export default function RememberAndForget({checked, handler}) {
    return(
        <div className="form-group d-md-flex">
            <div className="text-left" style={{width: "50%"}}>
                <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                    <input type="checkbox" checked={checked} onChange={(e) => {handler(e)}}/>
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="text-md-right" style={{width: "50%"}}>
                <a href="/forget-password">Forgot Password</a>
            </div>
        </div>
    );
}