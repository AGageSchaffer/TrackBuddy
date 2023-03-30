import React from "react";
import { Image } from "cloudinary-react";

function CarList({car, deleteCar, editCar, loggedUser}) {


    return(
        <div class="item">
        <div class="image">
            {/* <Image style={{width: 100}} cloudName='dltl186jg' publicId={car.photo_src} /> */}
            <img id="car-photo" src={car.photo_src}/>
        </div>
        <div class="content">
            <a class="header">{car.make} {car.model} {car.trim}</a>
            <div class="meta">
                <span class="cinema">{car.year}</span>
            </div>
            <div class="description">
                <p>{car.transmission}</p>
                <p>{car.mod_list}</p>
            </div>
            {loggedUser ? null : <div class="extra">
                <div class="ui right floated primary button" onClick={() => deleteCar(car.id)}>x</div>
                <div class="ui right floated primary button"onClick={() => editCar(car)}>Edit</div>
                </div>}
            </div>
        </div>
    )
}

export default CarList