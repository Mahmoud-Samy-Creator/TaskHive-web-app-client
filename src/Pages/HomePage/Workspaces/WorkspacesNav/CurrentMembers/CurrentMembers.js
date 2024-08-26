import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";


export default function CurrentMembers() {
    const {workspceId} = useParams()
    console.log(workspceId)
    const [members, setMembers] = useState([
        {
            id: 0,
            img: "",
            name: "Member [1]"
        },
        {
            id: 1,
            img: "",
            name: "Member [2]"
        },
        {
            id: 2,
            img: "",
            name: "Member [3]"
        },
    ])
    return(
        <div className="cuurent-members">
            <span>Members</span>
            <div className="connected-members">
                {members.map((member) => {
                    return(
                        <div className="member" key={member.id}>
                            {/* <span className="member-img" style={{display: "block", width: "30px", height: "30px", borderRadius: "50%", backgroundColor:"gray"}}></span> */}
                            <span className="member-name">Member [1]</span>
                            <span className="member-options"><FontAwesomeIcon icon={faMessage} /></span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}