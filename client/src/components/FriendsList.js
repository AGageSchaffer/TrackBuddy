import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function FriendsList({friendArr}){

 

    const friendsList = friendArr.map((friendObj) => {
        const friend = friendObj.friender
        const endpoint = '/' + friendObj.friender.username.toLowerCase()
        return <div className="card">
                <div className="image">
                    <img src="https://res.cloudinary.com/dltl186jg/image/upload/v1680137891/generic_nhtpmi.jpg"/>
                </div>
                <div className="content">
                    <div className="center aligned header">{friend.username}</div>
                    <div className="center aligned meta">{friend.firstName} {friend.lastName}</div>
                </div>
                <Link to={endpoint} className="item">
                <div className="ui bottom attached button">
                    View Profile
                </div>
                </Link>
                </div>
    })

    return(
        <div className="ui grid">
            <div className="three wide column"></div>
            <div className="ten wide column">
                <div className="ui centered cards">
                    {friendsList}
                </div>
            </div>
            <div className="three wide column"></div>
        </div>
    )
}

export default FriendsList