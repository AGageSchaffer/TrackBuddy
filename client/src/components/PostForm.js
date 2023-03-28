import React, { useState } from "react"
import TimeScoreForm from "./TimeScoreForm"


function PostForm({track, user, timescoreArr, setTimescoreArr, posts, setPosts}){
    const initialForm = {
        user_id: user.id,
        racetrack_id: track.id,
        body: ""
    }

    const timeform = {
        minute: "",
        second: "",
        millisecond: ""
    }
    
    const initialTimeScoreForm = {
        time: "",
        timeOfDay: "",
        date: "",
        temperature: "",
        weather: "",
        conditions: ""
    }
    
    const [timeforms, setTimeForm] = useState(timeform)
    const [formData, setFormData] = useState(initialForm)
    const [timeScoreForm, setTimeScoreForm] = useState(false)

    function handleChange(e){
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newFormData)
    }

    function postTimescore(timescore){
        fetch("/timescores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(timescore)
        }).then((r) => {
            if (r.ok) {
                r.json().then((timescore) => setTimescoreArr([...timescoreArr, timescore]))
            }
        })
    }

    function createTimescore(timescore){
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((post) => {
                    setPosts([...posts, post])
                    postTimescore({...timescore, post_id: post.id})
                })
            }
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const timescore = {
            ...timeScoreForm, time: timeforms.minute + ':' + timeforms.second + '.' + timeforms.millisecond
        }

        timeScoreForm ? createTimescore(timescore) : fetch("/posts", {
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
            {timeScoreForm ? <TimeScoreForm timeScoreFormData={timeScoreForm} setTimeScoreFormData={setTimeScoreForm} initialTimeScoreForm={initialTimeScoreForm} timeforms={timeforms} setTimeForm={setTimeForm} /> : <button onClick={() => {setTimeScoreForm(true); setTimeScoreForm(initialTimeScoreForm)}}>Add Timescore</button>}
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostForm