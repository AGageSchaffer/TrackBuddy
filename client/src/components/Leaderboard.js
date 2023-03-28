import React from "react";
import { useFetchOthersQuery } from "./features/othersSlice";

function Leaderboard({ timescores }) {

    const { data: users = []} = useFetchOthersQuery()


    const times = timescores?.map((timescore, index) => {
        const user = users?.find((user) => user.id === timescore.post.user_id)
        return (
            <div key={timescore.id}>
                <p>{index + 1}. {timescore?.time} - {user?.username} - {user?.firstName} {user?.lastName} </p>
            </div>
        )
    })

    return(
        <>
        {times}
        </>
    )
}

export default Leaderboard