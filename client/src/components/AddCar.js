import React, { useEffect, useState } from "react"


function AddCar({edit, setEdit, initialForm, formData, setFormData, cars, setCars, setFormView}){

    
    function handleChange(e){
        const newFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        setFormData(newFormData)
    }

    function handleSubmit(e) {
        e.preventDefault()
        edit ? 
        fetch("/racecars", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((racecar) => setCars(cars.map((car => car.id === racecar.id ? racecar : car))))
            }
        }) : (
        fetch("/racecars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((racecar) => setCars([...cars, racecar]))
            }
        }) 
        )
        setEdit(false)
        setFormView(false)
        setFormData(initialForm)
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Add Car</h2>
            <label>Year: </label>
            <input name='year' value={formData.year} onChange={(e) => handleChange(e)}></input>
            <label>Make: </label>
            <input name='make' value={formData.make} onChange={(e) => handleChange(e)}></input>
            <label>Model: </label>
            <input name='model' value={formData.model} onChange={(e) => handleChange(e)}></input>
            <label>Trim: </label>
            <input name='trim' value={formData.trim} onChange={(e) => handleChange(e)}></input>
            <label>Transmission: </label>
            <input name='transmission' value={formData.transmission} onChange={(e) => handleChange(e)}></input>
            <label>Mod List: </label>
            <input name='mod_list' value={formData.mod_list} onChange={(e) => handleChange(e)}></input>
            <label>Photo URL: </label>
            <input name='photo_src' value={formData.photo_src} onChange={(e) => handleChange(e)}></input>
            <button type="submit">Add Car</button>
        </form>
    )
}

export default AddCar