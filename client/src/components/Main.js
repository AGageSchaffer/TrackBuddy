import React from "react";
import { useFetchPostQuery } from "./features/postSlice";

function Main({timescores}) {

const {data: postArr = []} = useFetchPostQuery()

    

   
    const activity = postArr.slice(-6).reverse().map((post) => {
        const timescore = timescores?.find(timescore => { return timescore.post_id === post.id})
        return <div key={post.id} className="ui centered card">
            <div className="center aligned header">{post.racetrack.name}</div>
            <div className="center aligned meta">{post.user.username}</div>
            <div className="center aligned description">{timescore?.time}</div>
            <div className="center aligned description">{post.body}</div>
        </div>
    })

    return(

        <div className="ui grid">
            <div className="two wide centered column"></div>
                <div className="twelve wide centered column">
                    <h2 className="ui center aligned icon header">
                    <i className="settings icon"></i>
                    <div className="content">
                        <br></br>
                        Recent Activity
                    </div>
                    </h2>
                    <br></br>   

                    <div className='ui centered cards'>
                    {activity}
                </div>
            </div>
            <div className="two wide  column"></div>
        </div>

        // <div>
        //     <h2>Recent Activity</h2>
        //     {activity}
        // </div>
    )
}

export default Main