import React from "react";


export default function FormSubmissionBtn({content, submitRule}) {
    return(
        <div className="form-group" style={{marginTop: "35px"}}>
            <button type="submit" className="form-control btn btn-primary submit px-3">{content}</button>
        </div>
    );
}