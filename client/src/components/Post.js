import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useUpdatePostMutation } from "./features/postSlice"

function Post({post, postUser, user, posts, setPosts, track, timescores, setTimeScoreArr }){
    
    const [newBody, setNewBody] = useState(post.body)
    const [edit, setEdit] = useState(false)
    const [likeArr, setLikeArr] = useState([])
    const [moreInfo, setMoreInfo] = useState(false)

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
    const timescore = timescores?.find(timescore => { return timescore.post_id === post.id})
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

    function deletePost(post_id, timescore_id){
        const removePost = posts.filter(post => post.id !== post_id)
        setPosts(removePost)
        fetch(`/posts/${post_id}`, {method: "DELETE"})
        if (timescore_id !== ""){
        const removeTimeScore = timescores.filter(timescore => timescore.id !== timescore_id)
        setTimeScoreArr(removeTimeScore)
        fetch(`/timescores/${timescore_id}`, {method: "DELETE"})
        }
    }
    const endpoint = '/' + postUser.username.toLowerCase()
    return(
        <div>
        { post.racetrack_id === track.id ? <div key={post.id}>
                <Link to={endpoint}>
                    <h5>{postUser.username}: </h5>
                </Link>
                {timescore ? <p>Best Lap: {timescore.time} on {timescore.date}</p> : null}
                {timescore ? <button onClick={() => setMoreInfo(!moreInfo)}>{moreInfo ? "Hide Info" : "More Info"}</button> : null}
                {postUser.id === user.id ? <button onClick={() => setEdit(!edit)}>{edit === true ? "Cancel" : "Edit"}</button> : null}
                {postUser.id === user.id ? <button onClick={() => deletePost(post.id, timescore?.id)}>X</button> : null}
                {moreInfo ? <ul>
                    <li>Time Of Day: {timescore.timeOfDay}</li>
                    <li>Temp(f): {timescore.temperature}</li>
                    <li>Weather: {timescore.weather}</li>
                    <li>Track Conditions: {timescore.conditions}</li>
                    <li>Car: </li>
                </ul> : null}
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