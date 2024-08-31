import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

// API Params
const apiConfig = {
    headers: {
        "Authorization":`Bearer ${localStorage.getItem('authToken')}`
    }
};
const apiURL = `http://localhost:5000/workspaces`;
// API Params


export default function TotalAvatars({ WorkspaceMembers, setWorkspaceMembers }) {
    const [visibleOptions, setVisibleOptions] = useState(null);
    const avatarOptionRef = useRef(null);
    const {workspaceId} = useParams();

    useEffect(() => {
        function handleClickOutside(event) {
            if (avatarOptionRef.current && !avatarOptionRef.current.contains(event.target)) {
                setVisibleOptions(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleAvatarClick(index) {
        setVisibleOptions(index);
    }

    function handleChangeOwner(id) {
        console.log(id)
        axios.put(`${apiURL}/${workspaceId}/change_owner`, {"newOwnerId": `${id}`} , apiConfig)
        .then((res) => console.log(res))
        .catch((err) => {
            console.error(err)
        });
        setVisibleOptions(null);
    }

    function handleDeleteOwner(id) {
        axios.put(`${apiURL}/${workspaceId}/remove_members`, {"members": [`${id}`]} ,apiConfig)
        .then((res) => {
            const newMembers = WorkspaceMembers.filter((member) => member.id !== id);
            setWorkspaceMembers(newMembers);
        })
        .catch((err) => {
            console.error(err)
        });
        setVisibleOptions(null);
    }

    return (
        <AvatarGroup total={WorkspaceMembers.length}>
            {WorkspaceMembers.map((member, index) => {
                return (
                    <div className="member-avatar" key={index}>
                        <Avatar
                            alt={member.email}
                            src={`/static/images/avatar/${index}.jpg`}
                            onClick={() => handleAvatarClick(index)}
                        />
                        {visibleOptions === index && (
                            <div className="avatar-options" ref={avatarOptionRef}>
                                <button onClick={() => {handleChangeOwner(member.id)}}>Make owner</button>
                                <button onClick={() => {handleDeleteOwner(member.id)}}>Delete member</button>
                            </div>
                        )}
                    </div>
                );
            })}
        </AvatarGroup>
    );
}