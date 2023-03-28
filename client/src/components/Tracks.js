import React from "react"
import Tracklist from "./Tracklist"


function Tracks({posts, setPosts, user, faveTracks, setFaveTracks, timescore, setTimeScoreArr }){


    return(
        <div>
            <Tracklist posts={posts} setPosts={setPosts} user={user} timescore={timescore} setTimeScoreArr={setTimeScoreArr} faveTracks={faveTracks} setFaveTracks={setFaveTracks} />
        </div>
    )
}

export default Tracks