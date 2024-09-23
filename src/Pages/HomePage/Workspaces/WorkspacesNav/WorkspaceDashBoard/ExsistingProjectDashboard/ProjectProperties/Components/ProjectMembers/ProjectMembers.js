import React from "react";
import ApiReqContext from "../../../../../../Contexts/ApiContext";
import './ProjectMembers.scss';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function ProjectMembers({ workspaceId, projectId }) {
    const [projectMembers, setProjectMembers] = React.useState([]);
    const [memberEmail, setMemberEmail] = React.useState("");
    const [workspaceMembers, setWorkspaceMembers] = React.useState([]);
    const {apiURL, apiConfig} = React.useContext(ApiReqContext);

    // Fetching workspace members
    React.useEffect(() => {
        axios.get(`${apiURL}/${workspaceId}/members`, apiConfig)
        .then((res) => {
            if (res.status === 200) {
                setWorkspaceMembers(res.data);
            }
        })
        .catch((err) => console.error(err));
    }, [workspaceId, apiURL, apiConfig]);

    // Getting the project members
    React.useEffect(() => {
        axios.get(`${apiURL}/${workspaceId}/projects/${projectId}/members`, apiConfig
        )
        .then((res) => {
            if (res.status === 200) {
                setProjectMembers(res.data);
            }
        })
        .catch((err) => console.error(err));
    }, [workspaceId, projectId, apiURL, apiConfig]);

    // Add members to the project
    function handleAddProjectMembers(e) {
        e.preventDefault();
        const member = workspaceMembers.find(member => member.email === memberEmail);
        
        if (member) {
            axios.put(`${apiURL}/${workspaceId}/projects/${projectId}/add_members`,
                {
                    "members": [`${member.id}`]
                }, apiConfig
            )
            .then((res) => {
                if (res.status === 200) {
                    setProjectMembers((prevMembers) => [
                        ...prevMembers,
                        member
                    ]);
                    setMemberEmail("");
                }
            })
            .catch((err) => console.error(err));
        } else {
            console.error("Member not found in workspace members");
        }
    }

    return(
        <div className="project-members">
            <TotalAvatars
                projectMembers={projectMembers}
                workspaceId={workspaceId}
                projectId={projectId}
                setProjectMembers={setProjectMembers}
            />
            <form onSubmit={handleAddProjectMembers}>
                <input
                    type='email'
                    placeholder="Enter member email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                />
                <button className="add-members"><FontAwesomeIcon icon={faPlus} /> Add member</button>
            </form>
        </div>
    );
}

function TotalAvatars({ projectMembers, workspaceId, projectId, setProjectMembers }) {
    const {apiURL, apiConfig} = React.useContext(ApiReqContext);
    // Remove member from the project
    function handleRemoveMember(memberId) {
        axios.put(`${apiURL}/${workspaceId}/projects/${projectId}/remove_members`,
            {
                "members": [`${memberId}`]
            }, apiConfig
        )
        .then((res) => {
            if (res.status === 200) {
                setProjectMembers((prevMembers) => 
                    prevMembers.filter(member => member.id !== memberId)
                );
            }
        })
        .catch((err) => console.error(err));
        
        console.log("Member ID to remove:", memberId);
    }

    return (
        <div>
            <AvatarGroup total={projectMembers.length} max={3}>
                {
                    projectMembers.map((member, index) => {
                        return(
                            <div className="member-avatar" key={member.id}>
                                <Avatar alt={member.name} src={`/static/images/avatar/${index}.jpg`} />
                                <FontAwesomeIcon 
                                    onClick={() => handleRemoveMember(member.id)} 
                                    icon={faTrashCan} 
                                    className="delete-member-icon"
                                />
                            </div>
                        );
                    })
                }
            </AvatarGroup>
        </div>
    );
}
