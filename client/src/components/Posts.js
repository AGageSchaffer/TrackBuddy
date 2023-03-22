import React from "react"
import Post from "./Post"


function Posts({posts, setPosts, user}){

    

    const postlist = posts?.map((post) => {
        const postUser = post.user
        return <Post posts={posts} setPosts={setPosts} post={post} postUser={postUser} user={user}/>
    })

    return(
        <div>
        {postlist}
        </div>
    )
}

export default Posts