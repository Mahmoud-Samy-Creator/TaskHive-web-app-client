import React, { useState } from "react";
export default function UserAccountSettingChange() {
    return(
        <form action="#">
            <div className='user-account-change'>
                <UserInfoInput 
                    className='username-change-input'
                    htmlLabalId='username-change'
                    labelContent='Username:'
                    type='text'
                />
                <UserInfoInput 
                    className='email-change-input'
                    htmlLabalId='email-change'
                    labelContent='Email:'
                    type='email'
                />
                <UserInfoInput 
                    className='password-change-input'
                    htmlLabalId='password-change'
                    labelContent='Password:'
                    type='password'
                />
            </div>
            <div className="user-account-change-submit">
                <input type='submit' />
            </div>
        </form>
    );
}

function UserInfoInput({className, htmlLabalId, type, labelContent}) {
    const [isEditable, setIsEditable] = useState(false);
    const handleEdit = () => {
        setIsEditable(true);
    };
    return(
        <div className={className}>
            <label htmlFor={htmlLabalId}>{labelContent}</label>
            <input type={type} id={htmlLabalId} readOnly={!isEditable}></input>
            <span onClick={handleEdit}>Change</span>
        </div>
    );
}