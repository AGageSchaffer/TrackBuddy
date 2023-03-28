import React, { useState } from "react"
import {Image} from 'cloudinary-react'
import Axios from 'axios'

function AddCar({edit, setEdit, initialForm, formData, setFormData, cars, setCars, setFormView}){

    const [imageSelected, setImageSelected] = useState({})
    const [carPhoto, setCarPhoto] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
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
    
    function uploadImage(){
        setIsLoading(true)
        const carImg = new FormData()
        carImg.append('file', imageSelected)
        carImg.append('upload_preset', 'pdaxilgs')
        
        Axios.post("https://api.cloudinary.com/v1_1/dltl186jg/image/upload",
        carImg
        ).then((r) => {
            setIsLoading(false)
            setCarPhoto(r.data.secure_url)
            const newForm = {...formData, photo_src: r.data.secure_url}
            setFormData(newForm)
        })
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
            <label>Photo: </label>
            {carPhoto === '' ? <><input type='file' onChange={(e) => setImageSelected(e.target.files[0])}></input>
            <button onClick={uploadImage} type='button' >{isLoading ? 'uploading...' : 'Upload Image'}</button></> : <Image style={{width: 200}} cloudName='dltl186jg' publicId={carPhoto} />
        }
            <button type="submit">Add Car</button>
        </form>
    )
}

export default AddCar