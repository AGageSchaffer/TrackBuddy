import React from "react"
import Tracklist from "./Tracklist"


function Tracks({posts, setPosts, user, faveTracks, setFaveTracks}){


    return(
        <div>
            <Tracklist posts={posts} setPosts={setPosts} user={user} faveTracks={faveTracks} setFaveTracks={setFaveTracks} />
        </div>
    )
}

export default Tracks