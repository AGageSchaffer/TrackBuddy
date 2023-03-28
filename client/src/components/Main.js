import React from "react";
import { useFetchPostQuery } from "./features/postSlice";

function Main({timescores}) {

const {data: postArr = []} = useFetchPostQuery()

    

   
    const activity = postArr.slice(-5).reverse().map((post) => {
        const timescore = timescores?.find(timescore => { return timescore.post_id === post.id})
        return <div key={post.id}>
            <h4>{post.racetrack.name}</h4>
            <h5 className="username-recent">{post.user.username}<p>{timescore?.time}</p></h5>
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