import React, { useState } from "react";
import AddCar from "./AddCar";
import { Image } from "cloudinary-react";
import UserProfile from "./UserProfile";
import CarList from "./CarList";

function Profile({user, cars, setCars, loggedUser, friendArr, setFriendArr}){
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
        return <CarList car={car} deleteCar={deleteCar} editCar={editCar} loggedUser={loggedUser} />
    })

    return(
        <div className="ui grid">
            <div className="two wide column"></div>
            {loggedUser ? <div className="one wide column"></div> : <div className="one wide column">
                <div className="ui vertical buttons">
                    <button className="ui button">Edit Account</button>
                    <button className="ui button">Delete Account</button>
                </div>
            </div>}
            <div className="five wide column">
            <div className="ui large center aligned header">Profile</div>
                <UserProfile user={user} loggedUser={loggedUser} friendArr={friendArr} setFriendArr={setFriendArr} />
            </div>
            <div className="seven wide column">
                    <div className="ui large center aligned header">Cars</div>
                <div className="ui divided items">
                    {carlist}
            {loggedUser ? null : edit ? null : formView ?  <button className="ui button" onClick={() => setFormView(!formView)}>Close</button> : <button className="ui button" onClick={() => {setFormView(!formView)}}>Add Car</button>}
            {formView ? <AddCar edit={edit} setEdit={setEdit} initialForm={initialForm} formData={formData} setFormData={setFormData} cars={cars} setCars={setCars} setFormView={setFormView} /> : null}
                </div>
            </div>
            <div className="one wide column"></div>
        </div>
    )
}

export default Profile