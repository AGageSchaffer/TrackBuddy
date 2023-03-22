import React from "react"


function TimeScoreForm({timeScoreFormData, setTimeScoreFormData}){

    function handleChange(e){
        const newFormData = {
            ...timeScoreFormData,
            [e.target.name]: e.target.value
        }
        setTimeScoreFormData(newFormData)
    }

    return(
        <>
            <label>Time: </label>
            <input name='time' value={timeScoreFormData.time} onChange={(e) => handleChange(e)}></input>
            <label>Time of Day: </label>
            <input name='timeofday' value={timeScoreFormData.timeofday} onChange={(e) => handleChange(e)}></input>
            <label>Date: </label>
            <input name='date' value={timeScoreFormData.date} onChange={(e) => handleChange(e)}></input>
            <label>Temperature: </label>
            <input name='temperature' value={timeScoreFormData.temperature} onChange={(e) => handleChange(e)}></input>
            <label>Weather: </label>
            <input name='weather' value={timeScoreFormData.weather} onChange={(e) => handleChange(e)}></input>
            <label>Track Conditions: </label>
            <input name='conditions' value={timeScoreFormData.conditions} onChange={(e) => handleChange(e)}></input>
        </>
    )
}

export default TimeScoreForm