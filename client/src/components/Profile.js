import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AddCar from "./AddCar";

function Profile({user, cars, setCars}){
    const [edit, setEdit] = useState(false)
    const [formView, setFormView] = useState(false)
    const initialForm = {
        user_id: user.id,
        year: "",
        make: "",
        model: "",
        trim: "",
        transmission: "",
        mod_list: "",
        photo_src: ""
    }

    const [formData, setFormData] = useState(initialForm)



    function deleteCar(id){
        const removeCar = cars.filter(car => car.id !== id)
        setCars(removeCar)
        fetch(`/racecars/${id}`, {method: "DELETE"})
    }

    function editCar(car){
        setEdit(!edit)
        formView ? setFormData(initialForm) : setFormData(car)
        setFormView(!formView)
    }

    const carlist = cars.map((car) => {
        return <ul key={car.id}>
            <li><button onClick={() => deleteCar(car.id)}>x</button><button onClick={() => editCar(car)}>Edit</button>{car.year} {car.make} {car.model} {car.trim} {car.transmission} - {car.mod_list}</li>
        </ul>
    })

    return(
        <div>
            <button>Edit Account</button>
            <button>Delete Account</button>
            <h3>Username: {user.username}</h3>
            <h3>First Name: {user.firstName}</h3>
            <h3>Last Name: {user.lastName}</h3>
            <h3>email: {user.email}</h3>
            <h3>Cars</h3>
            {carlist ? carlist : null}
            {edit ? null : formView ?  <button onClick={() => setFormView(!formView)}>Cancel</button> : <button onClick={() => {setFormView(!formView)}}>Add Car</button>}
            {formView ? <AddCar edit={edit} setEdit={setEdit} initialForm={initialForm} formData={formData} setFormData={setFormData} cars={cars} setCars={setCars} setFormView={setFormView} /> : null}
        </div>
    )
}

export default Profile