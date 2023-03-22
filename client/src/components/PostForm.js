import React, { useState } from "react"
import TimeScoreForm from "./TimeScoreForm"


function PostForm({track, user, posts, setPosts}){
    const initialForm = {
        user_id: user.id,
        racetrack_id: track.id,
        body: ""
    }

    const initialTimeScoreForm = {
        time: "",
        timeofday: "",
        date: "",
        temperature: "",
        weather: "",
        conditions: ""
    }

    const [formData, setFormData] = useState(initialForm)
    const [timeScoreForm, setTimeScoreForm] = useState(false)
    const [timeScoreFormData, setTimeScoreFormData] = useState(initialTimeScoreForm)

    function handleChange(e){
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newFormData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((post) => setPosts([...posts, post]))
            }
        })
        setFormData(initialForm)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Body: </label>
            <input name='body' value={formData.body} onChange={(e) => handleChange(e)}></input>
            {timeScoreForm ? <TimeScoreForm timeScoreFormData={timeScoreFormData} setTimeScoreFormData={setTimeScoreFormData} /> : <button onClick={() => setTimeScoreForm(true)}>Add Timescore</button>}
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostForm