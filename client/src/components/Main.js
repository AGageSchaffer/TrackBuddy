import React from "react";
import { useFetchPostQuery } from "./features/postSlice";

function Main() {

const {data: postArr = []} = useFetchPostQuery()

    

   
    const activity = postArr.slice(-5).reverse().map((post) => {
        return <div>
            <h4>{post.racetrack.name}</h4>
            <h5 className="username-recent">{post.user.username}</h5>
            <p>{post.body}</p>
        </div>
    })

    return(
        <div>
            <h2>Recent Activity</h2>
            {activity}
        </div>
    )
}

export default Main