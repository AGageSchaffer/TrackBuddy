import React from "react"
import Post from "./Post"
import { useFetchPostQuery } from "./features/postSlice"

function Posts({ user, track, timescores, setTimeScoreArr, posts, setPosts}){

    const filteredPosts = posts?.filter((post) => post.racetrack_id === track.id)

    const postlist = filteredPosts?.map((post) => {
        const postUser = post.user
        return <Post key={post.id} track={track} post={post} posts={posts} setPosts={setPosts} postUser={postUser} user={user} timescores={timescores} setTimeScoreArr={setTimeScoreArr} />
    })
    return(
        <div>
        {postlist}
        </div>
    )
}

export default Posts