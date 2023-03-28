import React from "react"
import { Image } from "cloudinary-react"

function OtherProfiles({email, firstName, lastName, username, racecars}){

    const carlist = racecars?.map((car) => {
        return <ul key={car.id}>
            <li><Image style={{width: 100}} cloudName='dltl186jg' publicId={car.photo_src} />{car.year} {car.make} {car.model} {car.trim} {car.transmission} - {car.mod_list}</li>
        </ul>
    })

    return(
        <div>
            <h3>Username: {username}</h3>
            <h3>First Name: {firstName}</h3>
            <h3>Last Name: {lastName}</h3>
            <h3>email: {email}</h3>
            <h3>Cars</h3>
            {carlist ? carlist : null}
        </div>
    )
}

export default OtherProfiles