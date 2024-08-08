import React from "react";

export default function FormInput({InputFor, InputType, placeHolder, content, handler}) {
    return(
        <div className="form-group mb-3">
            <label className="label" htmlFor={InputFor}>{content}</label>
            <input type={InputType} className="form-control" placeholder={placeHolder} id={InputFor} onChange={(e) => handler(e)} required />
        </div>
    );
}