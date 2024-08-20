import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const members = [
    {
        id: 0,
        img: "",
        name: "Member [1]"
    },
    {
        id: 1,
        img: "",
        name: "Member [1]"
    },
    {
        id: 2,
        img: "",
        name: "Member [1]"
    },
]

export default function CurrentMembers() {
    return(
        <div className="cuurent-members">
            <span>Members</span>
            <div className="connected-members">
                {members.map((member) => {
                    return(
                        <div className="member" key={member.id}>
                            <span className="member-img" style={{display: "block", width: "30px", height: "30px", borderRadius: "50%", backgroundColor:"gray"}}></span>
                            <span className="member-name">Member [1]</span>
                            <span className="member-options"><FontAwesomeIcon icon={faMessage} /></span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}