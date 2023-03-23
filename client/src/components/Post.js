import { useState, useEffect } from "react"


function Post({post, postUser, user, posts, setPosts, track}){
    
    const [newBody, setNewBody] = useState(post.body)
    const [edit, setEdit] = useState(false)
    const [likeArr, setLikeArr] = useState([])
    useEffect(() => {
        fetch('/likes')
                .then((r) => r.json())
                .then((likes) => setLikeArr(likes))
    }, []);

    function handleChange(e){
        setNewBody(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const newPost = {
            id: post.id,
            body: newBody
        }
        fetch("/posts", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then((r) => {
            if (r.ok) {
                r.json().then((post) => setPosts(posts.map((p) => p.id === post.id ? post : p)))
            }
        })
        setEdit(false)
    }
    const postLikes = likeArr.filter((like) => like.post_id === post.id)
    const postLikeCount = postLikes.length
    function handleClick(){
        if (postLikes.filter((like) => like.user_id === user.id).length === 0) {
            const newLike = {
                post_id: post.id,
                user_id: user.id,
            }
            fetch("/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newLike)
            }).then((r) => {
                if (r.ok) {
                    r.json().then((like) => setLikeArr([...likeArr, like]))
                }
            })
        } else {
            const removeLike = likeArr.filter(like => like.user_id !== user.id)
            const removedLike = likeArr.filter(like => like.user_id === user.id)
            setLikeArr(removeLike)
            fetch(`/likes/${removedLike[0].id}`, {method: "DELETE"})
        }
    }

    return(
        <div>
        { post.racetrack_id === track.id ? <div key={post.id}>
                <p>{postUser.username}: </p>
                {postUser.id === user.id ? <button onClick={() => setEdit(!edit)}>{edit === true ? "X" : "Edit"}</button> : null}
                {edit ? <form onSubmit={(e) => handleSubmit(e)}>
                    <input value={newBody} onChange={(e) => handleChange(e)}></input>
                    <button type="submit">Change</button>
                    </form> : <p>{post.body}</p>}
                    <button onClick={() => handleClick()}>Likes: {postLikeCount}</button>
            </div> : null}
        </div>
    )
}

export default Post