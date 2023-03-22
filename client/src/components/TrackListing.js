import React, { useState } from "react"
import PostForm from "./PostForm"
import Posts from "./Posts"


function TrackListing({track, user, posts, setPosts}){
    const [showForm, setShowForm] = useState(false)


    function revealPost(){
        setShowForm(true)
    }

    function createPost(){


        setShowForm(false)
    }

    return(
        <div>
        <h1>{track.name}</h1>
        <p>Track Type: {track.style}</p>
        <p>{track.address}, {track.city}, {track.state}</p>
        <p>Length: {track.length} {track.length < 1 ? "Mile" : "Miles"}</p>
        <h3>Posts</h3>
        <Posts posts={posts} setPosts={setPosts} user={user} />
        {showForm ? <PostForm track={track} user={user} posts={posts} setPosts={setPosts}/> : 
        <button onClick={() => revealPost()}>Create Post</button>}
    </div>
    )
}

export default TrackListing