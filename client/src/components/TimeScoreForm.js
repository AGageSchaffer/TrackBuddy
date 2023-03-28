import React from "react"


function TimeScoreForm({timeScoreFormData, setTimeScoreFormData, timeforms, setTimeForm}){

    function handleTime(e){
        const newTime = {
            ...timeforms,
            [e.target.name]: e.target.value
        }
        setTimeForm(newTime)
    }

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
            <p><input name='minute' value={timeforms.minute} type='number' onChange={(e) => handleTime(e)} min='0' max='99' ></input>:<input name='second' type='number' min='0' max='59' value={timeforms.second} onChange={(e) => handleTime(e)} ></input>.<input name='millisecond' type='number' value={timeforms.millisecond} onChange={(e) => handleTime(e)} max='999' min='0' ></input></p>
            <label>Time of Day: </label>
            <input name='timeOfDay' value={timeScoreFormData.timeOfDay} onChange={(e) => handleChange(e)}></input>
            <label>Date: </label>
            <input name='date' type='date' value={timeScoreFormData.date} onChange={(e) => handleChange(e)}></input>
            <label>Temperature (f): </label>
            <input name='temperature' type='number' value={timeScoreFormData.temperature} onChange={(e) => handleChange(e)}></input>
            <label>Weather: </label>
            <input name='weather' value={timeScoreFormData.weather} onChange={(e) => handleChange(e)}></input>
            <label>Track Conditions: </label>
            <input name='conditions' value={timeScoreFormData.conditions} onChange={(e) => handleChange(e)}></input>
        </>
    )
}

export default TimeScoreForm