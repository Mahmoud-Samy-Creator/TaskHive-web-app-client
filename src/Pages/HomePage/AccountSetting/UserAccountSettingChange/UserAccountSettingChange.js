import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Home/UserInfoContext";

export default function UserAccountSettingChange() {
    const userInfo = useContext(UserContext);
    const [userInfoChange, setUserInfoChange] = useState(userInfo);

    // Set the userInfo according to the context
    useEffect(() => {
        setUserInfoChange(userInfo);
    }, [userInfo]);

    // Handle form submit
    function handleFormSubmit(e) {
        e.preventDefault();
    }
    return (
        <form action="#" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="user-account-change">
                <UserInfoInput
                    className="username-change-input"
                    htmlLabalId="username-change"
                    labelContent="Username:"
                    type="text"
                    value={userInfoChange?.username || ""}
                    setUserInfoChange={setUserInfoChange}
                    rule="username"
                />
                <UserInfoInput
                    className="email-change-input"
                    htmlLabalId="email-change"
                    labelContent="Email:"
                    type="email"
                    value={userInfoChange?.email || ""}
                    setUserInfoChange={setUserInfoChange}
                    rule="email"
                />
                <UserInfoInput
                    className="password-change-input"
                    htmlLabalId="password-change"
                    labelContent="Password:"
                    type="password"
                    value={userInfoChange?.password || ""}
                    setUserInfoChange={setUserInfoChange}
                    rule="password"
                />
            </div>
            <div className="user-account-change-submit">
                <input type="submit" />
            </div>
        </form>
    );
}

function UserInfoInput({ className, htmlLabalId, type, labelContent, value, rule, setUserInfoChange }) {
    const [isEditable, setIsEditable] = useState(false);

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleChange = (e) => {
        setUserInfoChange(prevState => ({
            ...prevState,
            [rule]: e.target.value
        }));
    };

    return (
        <div className={className}>
            <label htmlFor={htmlLabalId}>{labelContent}</label>
            <input
                type={type}
                id={htmlLabalId}
                readOnly={!isEditable}
                value={value}
                onChange={handleChange}
            />
            <span onClick={handleEdit}>Change</span>
        </div>
    );
}
