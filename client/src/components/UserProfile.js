import React, { useEffect, useState } from "react";
import Generic from "../images/Generic.jpg"
function UserProfile({user, loggedUser, friendArr, setFriendArr}){
    
    const isFriend = friendArr.map(friend => friend.friender.id === user.id).includes(true)

    function handleClick() {
        if (isFriend === false){
        const friends = {friendee_id: loggedUser.id, friender_id: user.id}
        fetch("/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friends)
        }).then((r) => {
            if (r.ok) {
                r.json().then((friend) => setFriendArr([...friendArr, friend]))
            }
        })
        } else if (isFriend === true) {
            const removeFriend = friendArr.filter(friend => friend.friender.id !== user.id)
            const removedFriend = friendArr.filter(friend => friend.friender.id === user.id)
            setFriendArr(removeFriend)
            fetch(`/friends/${removedFriend[0].id}`, {method: "DELETE"})
        }
    }
    return (
        <div className="ui centered card">
            <div className="image">
                <img src={Generic} />
            </div>
            <div className="content">
                <span className="center aligned header">{user.username}</span>
                <div className="center aligned meta">{user.email}</div>
                <div className="center aligned description">{user.firstName} {user.lastName}</div>
            </div>
            {loggedUser ? <button className="ui bottom attached button" onClick={() => handleClick()}>{isFriend ? "Unfriend" : "Add Friend"}</button> : null}
        </div>
    )
}

export default UserProfile