import React from "react"
import Post from "./Post"


function Posts({posts, setPosts, user, track}){

    const filteredPosts = posts.filter((post) => post.racetrack_id === track.id)

    const postlist = filteredPosts?.map((post) => {
        const postUser = post.user
        return <Post key={post.id} track={track} posts={posts} setPosts={setPosts} post={post} postUser={postUser} user={user}/>
    })
    return(
        <div>
        {postlist}
        </div>
    )
}

export default Posts