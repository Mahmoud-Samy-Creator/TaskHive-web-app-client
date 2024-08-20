import React from "react";
import UserSocialInfoChange from "./UserSocialInfoChange/UserSocialInfoChange";
import UserAccountSettingChange from "./UserAccountSettingChange/UserAccountSettingChange";
import './AccountSetting.scss';

export default function AccountSetting() {
    return(
        <div className="account-setting">
            <div>
                <div className="change-profile-pic">
                    <div className="profile-pic"></div>
                    <span>Change profile pic</span>
                    <div className="upload-account-info">
                        <form action="/">
                            <input type="file" id="myFile" name="filename" />
                            <input type="submit" />
                        </form>
                        <UserAccountSettingChange />
                    </div>
                </div>
                <UserSocialInfoChange />
            </div>
        </div>
    );
}



