import React from "react";
import { useFetchOthersQuery } from "./features/othersSlice";
import Default from "../images/Generic.jpg"

function Leaderboard({ timescores }) {

    const { data: users = []} = useFetchOthersQuery()


    const times = timescores?.map((timescore) => {
        const user = users?.find((user) => user.id === timescore.post.user_id)
        return (
            <div key={timescore.id} className="item">
                <img className="ui avatar image" src={Default}/>
                <div className="content">
                    <div className="header"> {timescore?.time}</div>
                    {user?.username} - {user?.firstName} {user?.lastName} 
                </div>
            </div>
        )
    })

    return(
        <div className="ui celled ordered list">
            {times}
        </div>
    )
}

export default Leaderboard